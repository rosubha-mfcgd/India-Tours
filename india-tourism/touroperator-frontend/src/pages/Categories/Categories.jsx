import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import DynamicTable from "../../components/DynamicTable";
import CategoryModal from "./CategoryModal";
import { getCategories } from "../../apiconfig/categoryApi";

export default function CategoriesPage() {
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const fetchCount = () => {
    getCategories()
      .then((res) => setCount(res.data.length))
      .catch(console.error);
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const handleSuccess = () => {
    fetchCount();
    setReloadKey((k) => k + 1); // force DynamicTable reload
    setOpenModal(false);
  };

  return (
    <>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Categories Dashboard</Typography>

        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Add Category
        </Button>
      </Stack>

      {/* KPI CARD */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Total Categories</Typography>
              <Typography variant="h3" color="primary">
                {count}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TABLE */}
      <DynamicTable
        key={reloadKey}
        resource="category"
        enableEdit
        enableDelete
        hideColumns={["_id", "__v"]}
      />

      {/* MODAL */}
      <CategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
