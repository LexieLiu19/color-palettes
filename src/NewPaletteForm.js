import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttons: { width: '100%' },
  button: { width: '50%', fontSize: '0.8em', fontWeight: 'bold' },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  //   const theme = useTheme();
  const [open, setOpen] = useState(true);

  const [colors, setColors] = useState(props.palettes[0].colors);

  const maxColors = 20;
  const isPaletteFull = colors.length >= maxColors;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };
  const handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      colors: colors,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
    };

    props.savePalette(newPalette);
    props.history.push('/');
  };

  const removeColor = (colorName) =>
    setColors(colors.filter((color) => color.name !== colorName));
  const clearColors = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    const ranNum = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[ranNum];

    setColors([...colors, randomColor]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) =>
    setColors(arrayMove(colors, oldIndex, newIndex));

  return (
    <div className={classes.root}>
      <PaletteFormNav
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        classes={classes}
        palettes={props.palettes}
        handleSubmit={handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h5" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={isPaletteFull}
            >
              Random color
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
          </div>

          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            colors={colors}
            addNewColor={addNewColor}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
