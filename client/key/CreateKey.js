import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import createKey from "./keyCreation";
 
const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};
 
function CreateKey(props) {
  const { classes } = props;
 
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Please click the button below to create and record your keys
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={createKey}>
          Create Keys
        </Button>
      </CardActions>
    </Card>
  );
}
 
CreateKey.propTypes = {
  classes: PropTypes.object.isRequired
};
 
export default withStyles(styles)(CreateKey);
