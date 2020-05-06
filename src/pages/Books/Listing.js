import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import EnhancedTableHead from '../../components/EnhancedTableHead';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import api from '../../services/api';
import { format } from 'date-fns';
import { useHistory } from 'react-router';

const headCells = [
  {
    id: 'book',
    alignment: 'left',
    disablePadding: true,
    label: 'Book Name'
  },
  {
    id: 'author',
    alignment: 'center',
    disablePadding:
      false,
    label: 'Book Author Name'
  },
  {
    id: 'publisher',
    alignment: 'center',
    disablePadding: false,
    label: 'Publisher Name'
  },
  {
    id: 'publishedOn',
    alignment: 'center',
    disablePadding: false,
    label: 'Date of Publications'
  },
  {
    id: 'actions',
    alignment: 'center',
    disablePadding: false,
    label: 'Actions'
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  paperActions: {
    width: '100%',
    padding: 10,
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function BooksListing() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [data, setData] = React.useState();
  const history = useHistory();

  React.useEffect(() => {
    api.getBooks()
      .then((response) => setData(response.data));
  }, []);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  if (!data) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paperActions}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => history.push('/books/create')}
        >
          Create New Book
        </Button>
      </Paper>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.book}</TableCell>
                      <TableCell align="center">{row.author}</TableCell>
                      <TableCell align="center">{row.publisher}</TableCell>
                      <TableCell align="center">{format(new Date(row.publishedOn), 'MMMM dd yyyy')}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {data.length === 0 && (
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}