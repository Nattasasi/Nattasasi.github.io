/*
Bootstrap has been replaced with MUI.
*/

import { 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableFooter,
  Paper,
  Typography
} from "@mui/material";
import { ShoppingCart, Clear, Delete } from "@mui/icons-material";

import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearAll }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Box>
        <Typography variant="h4" component="h1">Quotation</Typography>
        <Typography><ShoppingCart /> No items</Typography>
      </Box>
    );
  }

  const total = data.reduce((acc, v) => acc + v.qty * (v.ppu - v.discount), 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.discount * v.qty, 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', minWidth: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom>Quotation</Typography>
      <Button variant="outlined" startIcon={<Clear />} onClick={clearAll} sx={{ mb: 2, alignSelf: 'flex-start' }}>
        Clear
      </Button>
      <TableContainer 
        component={Paper} 
        sx={{ width: '80%', flex: 1 }}
      >
        <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={style.textCenter}>-</TableCell>
              <TableCell align="center" className={style.textCenter}>Qty</TableCell>
              <TableCell align="center" className={style.textCenter}>Item</TableCell>
              <TableCell align="center" className={style.textCenter}>Price/Unit</TableCell>
              <TableCell align="center" className={style.textCenter}>Discount</TableCell>
              <TableCell align="center" className={style.textCenter}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * (v.ppu - v.discount);
              return (
                <TableRow key={i}>
                  <TableCell align="center" className={style.textCenter}>
                    <Delete 
                      onClick={() => handleDelete(i)} 
                      sx={{ cursor: 'pointer', color: 'error.main' }} 
                    />
                  </TableCell>
                  <TableCell align="center" className={style.textCenter}>{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center" className={style.textCenter}>{v.ppu}</TableCell>
                  <TableCell align="center" className={style.textCenter}>{v.discount * v.qty}</TableCell>
                  <TableCell align="right" className={style.textRight}>{amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} align="right" className={style.textRight}>
                Total
              </TableCell>
              <TableCell align="right" className={style.textRight}>
                {totalDiscount}
              </TableCell>
              <TableCell align="right" className={style.textRight}>{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default QuotationTable;
