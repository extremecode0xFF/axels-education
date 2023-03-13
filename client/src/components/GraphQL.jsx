import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import { CREATE_USER } from "../api/mutation/users";
import { GET_ALL_USERS } from "../api/query/users";

export default function GraphQL() {
  const { data, loading } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age: +age,
        },
      },
    }).then(({ data }) => setUsers((prev) => [...prev, data.createUser]));
  };

  return (
    <>
      <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
        <CardContent>
          <FormControl autoComplete="off">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  id="outlined-basic"
                  label="username"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  name="age"
                  id="outlined-basic"
                  label="age"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={(e) => addUser(e)}
                  fullWidth
                >
                  Add user
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
      <BasicTable rows={users} />
    </>
  );
}

export function BasicTable({ rows }) {
  return (
    <TableContainer
      sx={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}
    >
      <Table sx={{ width: "auto" }} aria-label="simple table" component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
