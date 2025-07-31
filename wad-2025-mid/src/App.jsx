/*
Bootstrap has been replaced with MUI.
*/

import { useState, useRef } from "react";
import { 
  Container, 
  Grid, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Box,
  Divider
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import defaultData from "./data.json";

const products = [
  { code: "p001", name: "Product A", price: 100, discount: 0 },
  { code: "p002", name: "Product B", price: 200, discount: 0 },
  { code: "p003", name: "Product C", price: 150, discount: 0 },
  { code: "p004", name: "Product D", price: 250, discount: 0 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  // Transform data.json to match component format
  const transformedData = defaultData.map(item => ({
    item: item.item,
    ppu: item.unitPrice,
    qty: item.quantity,
    discount: item.discount
  }));

  const [dataItems, setDataItems] = useState(transformedData);
  const [ppu, setPpu] = useState(products[0].price);
  const [discount, setDiscount] = useState(products[0].discount);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code)

    const newItem = {
      item: item.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      discount: disRef.current.value,
    };

    // Check if an identical item already exists (same name and price)
    const existingItemIndex = dataItems.findIndex(
      (existingItem) => 
        existingItem.item === newItem.item && 
        existingItem.ppu === newItem.ppu
    );

    if (existingItemIndex !== -1) {
      // Item exists, merge by adding quantities
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: parseInt(updatedItems[existingItemIndex].qty) + parseInt(newItem.qty)
      };
      setDataItems(updatedItems);
    } else {
      // Item doesn't exist, add as new item
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code)
    setPpu(item.price)
  }

  const clearAll = () => {
    setDataItems([]);
  }

  return (
    <Box sx={{  mt: 2, px: 2, minHeight: "100vh" }}>
      <Grid container spacing={2} sx={{ height: "100%", width: "100%", display: "fixed" }}>
        <Grid item xs={4}>
          <Box sx={{ backgroundColor: "#e4e4e4", p: 2, borderRadius: 1 }}>
            <Box sx={{ backgroundColor: "#ffffffff", mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="product-select-label">Item</InputLabel>
                <Select
                  labelId="product-select-label"
                  label="Item"
                  inputRef={itemRef}
                  defaultValue={products[0].code}
                  onChange={productChange}
                >
                  {products.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{backgroundColor: "#ffffffff", mb: 2 }}>
              <TextField
                fullWidth
                label="Price Per Unit"
                type="number"
                inputRef={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(ppuRef.current.value)}
              />
            </Box>
            
            <Box sx={{backgroundColor: "#ffffffff", mb: 2 }}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                inputRef={qtyRef}
                defaultValue={1}
              />
            </Box>

            <Box sx={{ backgroundColor: "#ffffffff",mb: 2 }}>
              <TextField
                fullWidth
                label="Discount"
                type="number"
                inputRef={disRef}
                defaultValue={0.0}
                onChange={(e) => setDiscount(disRef.current.value)}
              />
            </Box>

            <Divider sx={{ backgroundColor: "#3f3f3fff", my: 2 }} />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addItem}
            >
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ display: "fixed" }}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
