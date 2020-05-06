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
import { useHistory, useParams } from 'react-router';

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
  const { id } = useParams();

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
    const content = {
      ...form,
      publishedOn: form.publishedOn.toISOString()
    };

    if (id) {
      return api.updateBook(id, content)
        .then()
    }
    
    return api.createBook(content)
    .then(() => history.push('/books'));
  }

  React.useEffect(() => {
    if (id) {
      api.getBookById(id)
        .then(({ data }) => 
          setForm({
            ...data,
            publishedOn: new Date(data.publishedOn)
          })
        );
    }
  }, [id]);

  if (id && !form.book) {
    return null;
  }

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} className={classes.root} noValidate autoComplete="off">
        <Paper>
          <Typography variant="h6" id="tableTitle" component="div">
            Create Book
          </Typography>
          <Grid style={{ paddingTop: 30 }} container spacing={3}>
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
                Submit
              </Button>
              <Button onClick={() => history.push('/books')} type="button" variant="contained">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </React.Fragment>
  );
};