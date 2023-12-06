import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { KpiState } from "../../Context/KpiPropvider";
import axios from "axios";
import {
  Cell,
  Bar,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Sector,
} from "recharts";

const StackedBarChart = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const {
    user,
    setUser,
    kpi,
    setKpi,
    revenue,
    setRevenue,
    expenses,
    setExpenses,
  } = KpiState();
  //console.log(user);

  const returnNumber = (str) => {
    return parseInt(str.replace(/\D/g, ""));
  };

  const fetchKpis = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            user?.token ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDA4NmM0MTlhMjU2OWY0OTliYzAyYiIsImlhdCI6MTY5ODcyNzY3MSwiZXhwIjoxNzAxMzE5NjcxfQ.phNsAIxBqPWWoatX7wErhS-mhxyJd1pKEhGJbVJKRB4"
          } `,
        },
      };
      const { data } = await axios.get("/api/kpis", config);
      console.log("API Response:", data);
      setKpi(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchKpis();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "auto",
        height: "48vh",
        "@media (max-width: 900px)": {
          flexDirection: "column",
        },
      }}
    >
      {kpi ? (
        <Box sx={{}}>
          <Typography variant="h6" my="1rem" ml="4rem" color={"#055E99"}>
            Revenue and expenses
          </Typography>
          {kpi.map((kpis) => (
            <AreaChart width={500} height={300} data={kpis.monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C37C15" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#C37C15" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C37C15" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#C37C15" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0 0" />
              <XAxis dataKey="month" tick="" tickLine={false} />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "10px" }}
                domain={[8000, 23000]}
              />

              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                dot={true}
                activeDot={{ r: 5 }}
                stroke="#C37C15"
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                dot={true}
                fill="url(#colorRevenue)"
                stroke="#C37C15"
              />
            </AreaChart>
          ))}
        </Box>
      ) : (
        <>loading...</>
      )}
      {kpi ? (
        <Box>
          <Typography variant="h6" my="1rem" ml="4rem" color={"#055E99"}>
           Operational vs Non-operational expenses
          </Typography>
          {kpi.map((k) => (
            <BarChart width={500} height={300} data={k.monthlyData}>
              <CartesianGrid strokeDasharray="0 0" />
              <XAxis dataKey="month" tick="" tickLine={false} />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "10px" }}
                domain={[7000, 18000]}
              />
              <Tooltip />

              <Bar dataKey="operationalExpenses" stackId="a" fill="#055E99" />
              <Bar
                dataKey="nonOperationalExpenses"
                stackId="a"
                fill="url(#colorRevenue)"
              />
            </BarChart>
          ))}
        </Box>
      ) : (
        <>loading...</>
      )}
    </Box>
  );
};

export default StackedBarChart;
