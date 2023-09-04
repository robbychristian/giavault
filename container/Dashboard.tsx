import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getNotificationsClient } from "@helper/client/notification";

const Dashboard = () => {
  const { data: session, status } = useSession({ required: true });
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    if (status == "authenticated") {
      getNotificationsClient(session?.user._id!, session?.user.accessToken!, setPolicies);
    }
  }, [status]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" component="div">
                Expiring Policies
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {`${policies.length} (within 30 days)`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            {/* <Deposits /> */}
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>{/* <Orders /> */}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
