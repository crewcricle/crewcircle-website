import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 30,
  },
  text: {
    fill: '#7df3e1',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
});

export const LogoFull = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 36"
    >
      <text x="0" y="26" className={classes.text}>
        Crewcircle
      </text>
    </svg>
  );
};
