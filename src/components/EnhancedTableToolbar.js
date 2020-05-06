
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));


export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >      
      {
        numSelected === 0 ? (
          <div style={{ padding: '20px 0' }}>
            <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
              Books
            </Typography>
            <Typography className={classes.title} variant="subtitle1" id="tableTitle" component="div">
              List of all the books
            </Typography>
          </div>
        ) : (
          <Typography className={classes.title} variant="subtitle1" id="tableTitle" component="div">
            {numSelected} books selected
          </Typography>
        )
      }
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};