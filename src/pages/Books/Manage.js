import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import api from '../../services/api';

import {
  TextField,
  Grid,
  Typography,
  Button
} from '@material-ui/core';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      padding: 20,
      width: '100%'
    },
    '& .MuiGrid-item': {
      padding: 12
    }
  },
}));

export default (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [form, setForm] = React.useState({
    book: '',
    publisher: '',
    author: '',
    publishedOn: new Date(),
  });

  const onChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    api.createBook({
      ...form,
      publishedOn: form
        .publishedOn
        .toISOString()
    })
    .then(() => history.push('/books'));
  }

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} className={classes.root} noValidate autoComplete="off">
        <Paper>
          <Typography variant="h6" id="tableTitle" component="div">
            Create Book
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={3} md={3}>
              <TextField
                id="book"
                fullWidth
                value={form.book}
                label="Book Name"
                onChange={(e) => onChange('book', e.target.value)}
              />
            </Grid>
            <Grid item lg={3} md={3}>
              <TextField
                id="author"
                fullWidth
                value={form.author}
                label="Author Name"
                onChange={(e) => onChange('author', e.target.value)}
              />
            </Grid>
            <Grid item lg={3} md={3}>
              <TextField
                id="publisher"
                fullWidth
                value={form.publisher}
                label="Publisher Name"
                onChange={(e) => onChange('publisher', e.target.value)}
              />
            </Grid>
            <Grid item lg={3} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  id="publishedOn"
                  variant="inline"
                  fullWidth
                  value={form.publishedOn}
                  format="MM/dd/yyyy"
                  margin="normal"
                  onChange={(value) => onChange('publishedOn', value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={3} md={3}>
              <Button type="submit" variant="contained" color="primary">
                Create New Book
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </React.Fragment>
  );
};