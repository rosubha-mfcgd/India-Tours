import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { Plus, Minus } from "lucide-react";
import { createTourOperator } from "../../apiconfig/tourManagersApi";

export default function TourOperatorModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phones: [
      { number: "", type: "mobile", isPrimary: true },
    ],
  });

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  //const phoneIndex = e.target.dataset.phoneIndex;
  const phoneIndex = value;
  console.log('phone Index...',phoneIndex)
  console.log('name...',name)
 
     setForm((prev) => ({
      ...prev,
     [name]: type === "checkbox" ? checked : value,
     }));
  }

 const handlePhoneChange = (e,index) => {
  const { name, value, type, checked } = e.target;
  const phoneIndex = index;

  console.log('phone Index...',phoneIndex)
  console.log('name...value...',name,value)
  if (phoneIndex !== undefined && name === 'number') {
    console.log('here 1...',name)
    //const index = parseInt(phoneIndex, 10);
    setForm((prev) => {
      let updatedPhones = [...prev.phones];
      console.log('update Phones....',updatedPhones)
       updatedPhones[index].number = value;
      return { ...prev, phones: updatedPhones };
    });
  } else if(name === "type") {
   // console.log('here 2...',name)
    setForm((prev) => {
      let updatedPhones = [...prev.phones];
      updatedPhones[index].type = value;
      return { ...prev, phones: updatedPhones };
    });
   } else if(name === "isPrimary")
   {
    // Ensure only one primary
       if (checked) {
         
         for(let i=0;i<updatedPhones.length;i++)
         {
            if(i != index)
            {
              updatedPhones[i].isPrimary = false;
            }else{
                updatedPhones[index].isPrimary = true;
            }
         }
       }
       return { ...prev, phones: updatedPhones };
   }
}

  const addPhone = () => {
    if (form.phones.length >= 3) return; // max 3 phones
    setForm((prev) => ({
      ...prev,
      phones: [...prev.phones, { number: "", type: "mobile", isPrimary: false }],
    }));
  };

  const removePhone = (index) => {
    setForm((prev) => {
      const updatedPhones = prev.phones.filter((_, i) => i !== index);
      // Ensure at least one phone remains primary
      if (!updatedPhones.some((p) => p.isPrimary) && updatedPhones.length > 0) {
        updatedPhones[0].isPrimary = true;
      }
      return { ...prev, phones: updatedPhones };
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phones: form.phones.filter((p) => p.number.trim() !== ""),
      };

      // Ensure only one primary
      if (payload.phones.filter((p) => p.isPrimary).length > 1) {
        return alert("Only one primary phone is allowed");
      }

      await createTourOperator(payload);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Tour Operator</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* Existing Fields */}
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />

          {/* Phone Numbers */}
          <Typography variant="subtitle1">Phone Numbers (max 3)</Typography>
          {form.phones.map((phone, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
            <TextField
              label="Number"
              name="number"
              type="tel"                  // <-- change here
              value={phone.number}
              data-phone-index={index}
              onChange={(e)=>handlePhoneChange(e,index)}
              fullWidth
            />
              <TextField
                select
                label="Type"
                name="type"
                value={phone.type||""}
                data-phone-type={index}
                onChange={(e)=>handlePhoneChange(e,index)}
                sx={{ width: 120 }}
              >
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="office">Office</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPrimary"
                    checked={phone.isPrimary}
                    data-phone-index={index}
                    onChange={(e)=>handlePhoneChange(e,index)}
                  />
                }
                label="Primary"
              />
              {form.phones.length > 1 && (
                <IconButton color="error" onClick={() => removePhone(index)}>
                  <Minus size={20} />
                </IconButton>
              )}
            </Stack>
          ))}

          {form.phones.length < 3 && (
            <Button startIcon={<Plus size={16} />} onClick={addPhone}>
              Add Phone
            </Button>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
