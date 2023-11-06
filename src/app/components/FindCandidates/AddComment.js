import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { isEmail } from "../../utils/Functions";

export default function AddComment(props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Comment</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            className="my-3"
            inputProps={{ maxLength: 200 }}
            onChange={(e) => setEmail(e.target.value)}
            //error={errors.keyD?true:false}
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Enter Comment"
            fullWidth
            variant="outlined"
          />
          {error && (
            <Alert className="my-3" severity="error">
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)}>cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (email.length > 0) {
                setError(null);
                props.handleSubmit(email);
              } else {
                setError("Enter Valid Details");
              }
            }}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

{
  /* <TwoBDialog title="Delete Event" description="Are you sure you want to delete this event"
rightButton="Delete"
leftButton="Cancel"
open={open}
setOpen={setOpen}
handleSubmit={handleSubmit}
/> */
}
