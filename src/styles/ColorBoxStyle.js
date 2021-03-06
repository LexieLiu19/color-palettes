import chroma from 'chroma-js';
import sizes from './sizes';

const styles = {
  ColorBox: {
    width: '20%',
    height: (props) => (props.showFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    marginBottom: '-3px',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    '&:hover button': {
      opacity: 1,
    },

    //Computed object property names
    [sizes.down('lg')]: {
      width: '25%',
      height: (props) => (props.showFullPalette ? '20%' : '33.33333%'),
    },
    [sizes.down('md')]: {
      width: '50%',
      height: (props) => (props.showFullPalette ? '10%' : '20%'),
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: (props) => (props.showFullPalette ? '5%' : '10%'),
    },
  },
  textColor: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.5 ? '#fff' : '#000',
  },
  seeMore: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.5 ? '#fff' : 'rgba(0,0,0,0.6)',
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: 0,
    bottom: 0,
    width: '60px',
    height: '30px',
    textAlign: ' center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: ' 1rem',
    lineHeight: '30px',
    color: '#fff',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: 0,
    cursor: 'pointer',
  },
  BoxContent: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    padding: '10px',
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: ' 12px',
  },
  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  showOverlay: {
    opacity: 1,
    transform: 'scale(50)',
    zIndex: 10,
    position: 'absolute',
  },
  copyMessage: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    transform: 'scale(0.1)',
    color: '#fff',
    opacity: 0,
    '& h1': {
      fontWeight: 400,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBottom: 0,
      padding: '1rem',
      [sizes.down('xs')]: {
        fontSize: '3rem',
      },
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: 100,
    },
  },
  showCopyMessage: {
    opacity: 1,
    transform: 'scale(1)',
    zIndex: 20,
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s',
  },
};

export default styles;
