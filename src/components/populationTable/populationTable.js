import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@material-ui/core";

import styles from "./populationTable.module.scss";

const PopulationTable = props => {
  const planetSelected = planet => {
    if (props.planetSelected && typeof props.planetSelected === "function") {
      props.planetSelected(planet);
    }
  };
  return (
    <Paper className={styles.populationContainer}>
      <Typography variant="h6">{props.title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(item => {
            return (
              <TableRow key={item.name} onClick={() => planetSelected(item)}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.population}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PopulationTable;
