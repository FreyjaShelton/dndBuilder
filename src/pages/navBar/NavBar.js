import * as React from 'react';
import {
	Box, Toolbar, IconButton, Typography, Menu, Container, Button,
	MenuItem, Stepper, Step, StepButton, useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getWizardSteps } from '../../data/wizardSteps';
import { useCharacter } from '../../context/CharacterContext';
import { getEditionData } from '../../data';
import CharacterLibrary from '../../components/CharacterLibrary';

const BORDER = '1px solid rgba(255, 255, 255, 0.08)';

// On phones the Previous/Next buttons show only their arrow, so drop the text spacing around it.
const COMPACT_BUTTON = {
	minWidth: { xs: 40, sm: 64 },
	paddingX: { xs: 1, sm: 1.5 },
	'& .MuiButton-startIcon': { marginRight: { xs: 0, sm: '8px' }, marginLeft: { xs: 0, sm: '-4px' } },
	'& .MuiButton-endIcon': { marginLeft: { xs: 0, sm: '8px' }, marginRight: { xs: 0, sm: '-4px' } },
};

// Google-search-style pager made of step names: a window of `siblings` steps either side of the
// current one (always the same size, so it doesn't jump around), "…" where more steps exist, and
// optionally the first and last step pinned at the ends.
function StepPager({ labels, current, siblings, boundary, onSelect }) {
	const last = labels.length - 1;
	const size = Math.min(labels.length, 2 * siblings + 1);
	const start = Math.max(0, Math.min(current - siblings, labels.length - size));
	const end = start + size - 1;

	const entries = [];
	if (boundary && start > 0) entries.push(0);
	if (start > (boundary ? 1 : 0)) entries.push('gap-start');
	for (let i = start; i <= end; i++) entries.push(i);
	if (end < last - (boundary ? 1 : 0)) entries.push('gap-end');
	if (boundary && end < last) entries.push(last);

	return (
		<Box component="nav" aria-label="Builder steps" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5 }}>
			{entries.map((entry) => (typeof entry === 'string' ? (
				<Typography key={entry} variant="body2" aria-hidden sx={{ color: 'text.secondary', paddingX: 0.5 }}>…</Typography>
			) : (
				<Button
					key={entry}
					size="small"
					variant={entry === current ? 'contained' : 'text'}
					color={entry === current ? 'primary' : 'inherit'}
					aria-current={entry === current ? 'step' : undefined}
					onClick={() => onSelect(entry)}
					sx={{ minWidth: 0, paddingX: 1, whiteSpace: 'nowrap', fontWeight: entry === current ? 700 : 500, color: entry === current ? undefined : 'text.secondary' }}
				>
					{labels[entry]}
				</Button>
			)))}
		</Box>
	);
}

export default function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const theme = useTheme();
	const narrow = useMediaQuery(theme.breakpoints.down('sm'));
	const wide = useMediaQuery(theme.breakpoints.up('md'));
	const location = useLocation();
	const navigate = useNavigate();
	const { character } = useCharacter();
	const pages = getWizardSteps(character);
	const stepLabel = (page) => (page === 'Race' ? getEditionData(character.edition).raceLabel : page);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const normalizedPath = location.pathname.toLowerCase() === '/' ? '/edition' : location.pathname.toLowerCase();
	const rawIndex = pages.findIndex(page => `/${page.toLowerCase()}` === normalizedPath);
	const currentIndex = rawIndex === -1 ? 0 : rawIndex;

	const goTo = (index) => {
		navigate(`/${pages[index].toLowerCase()}`);
		window.scrollTo(0, 0);
	};

	const handleNext = () => {
		if (currentIndex < pages.length - 1) goTo(currentIndex + 1);
	};

	const handlePrevious = () => {
		if (currentIndex > 0) goTo(currentIndex - 1);
	};

	return (
		<Box sx={{ minHeight: '100vh' }}>
			{/* One sticky bar: title, Previous/Next and the step indicator all stay on screen while scrolling. */}
			<Box
				component="header"
				sx={{
					position: 'sticky',
					top: 0,
					zIndex: (theme) => theme.zIndex.appBar,
					backgroundColor: 'background.paper',
					borderBottom: BORDER,
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
				}}
			>
				<Container maxWidth="md">
					<Toolbar disableGutters variant="dense" sx={{ gap: 1, minHeight: 56 }}>
						<IconButton
							aria-label="Jump to a step"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							sx={{ color: 'text.primary', display: { xs: 'inline-flex', lg: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="a"
							href="#/home"
							noWrap
							sx={{ color: 'text.primary', textDecoration: 'none', fontWeight: 700, flexGrow: 1, minWidth: 0, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}
						>
							D&D 5e Builder
						</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', lg: 'block' }, marginRight: 1 }}>
							Step {currentIndex + 1} of {pages.length}
						</Typography>
						<CharacterLibrary compact />
						<Button
							variant="outlined"
							color="primary"
							size="small"
							sx={COMPACT_BUTTON}
							startIcon={<ArrowBackIcon />}
							onClick={handlePrevious}
							disabled={currentIndex <= 0}
							aria-label="Previous step"
						>
							<Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Previous</Box>
						</Button>
						<Button
							variant="contained"
							color="primary"
							size="small"
							sx={COMPACT_BUTTON}
							endIcon={<ArrowForwardIcon />}
							onClick={handleNext}
							disabled={currentIndex >= pages.length - 1}
							aria-label="Next step"
						>
							<Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Next</Box>
						</Button>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							keepMounted
							transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									component='a'
									href={`#/${page.toLowerCase()}`}
									onClick={handleCloseNavMenu}
								>
									{stepLabel(page)}
								</MenuItem>
							))}
						</Menu>
					</Toolbar>
				</Container>

				{/* The full stepper needs ~1100px, so it only shows on wide screens; narrower ones get the compact version below. */}
				<Box sx={{ display: { xs: 'none', lg: 'block' }, borderTop: BORDER }}>
					<Container maxWidth="lg">
						<Stepper nonLinear activeStep={currentIndex} sx={{ paddingY: 1.5 }}>
							{pages.map((page, index) => (
								<Step key={page} completed={index < currentIndex}>
									<StepButton onClick={() => goTo(index)}>{stepLabel(page)}</StepButton>
								</Step>
							))}
						</Stepper>
					</Container>
				</Box>

				{/* Narrower screens: a Google-style pager showing a window of step numbers around the current one. */}
				<Box sx={{ display: { xs: 'block', lg: 'none' }, borderTop: BORDER, paddingY: 0.75 }}>
					<Container maxWidth="md" disableGutters sx={{ paddingX: 1 }}>
						<StepPager
							labels={pages.map(stepLabel)}
							current={currentIndex}
							siblings={narrow ? 1 : 2}
							boundary={wide}
							onSelect={goTo}
						/>
					</Container>
				</Box>
			</Box>

			<Container maxWidth="md" sx={{ paddingBottom: 6, paddingTop: 3 }}>
				<Outlet />
			</Container>
		</Box>
	);
}
