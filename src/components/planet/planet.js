import React from "react";
import {
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";


const Planet = props => {
  return (
    <Card>
      <CardContent>        
        <Typography variant="h5" component="h2">
          {props.selectedPlanet.name}
        </Typography>
        <Typography  color="textSecondary">
          Population - {props.selectedPlanet.population}
        </Typography>
        <Typography  color="textSecondary">
          Climate - {props.selectedPlanet.climate}
        </Typography>
        <Typography  color="textSecondary">
          Gravity - {props.selectedPlanet.gravity}
        </Typography>       
        <Typography  color="textSecondary">
          Climate - {props.selectedPlanet.terrain}
        </Typography>
        <Typography  color="textSecondary">
          Surface Water - {props.selectedPlanet.surface_water}
        </Typography>
      </CardContent>    
    </Card>
  );
};

export default Planet;
