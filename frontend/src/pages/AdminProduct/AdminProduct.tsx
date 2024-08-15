import { ImageUpload } from "@/components";
import useAuth from "@/context/AuthContext";
import { IProduct } from "@/interfaces/IProduct";
import apiFood from "@/services/apiFood";
import { Box, Button, Grid, Switch, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

export const AdminProduct: FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isToEdit, setIsToEdit] = useState(false);

  const selectProduct = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const updateProduct = async () => {
    alert("Somente edição de imagem disponivel");
  };

  const getProducts = async () => {
    if (!user.token) return;

    try {
      const response = await apiFood.get("/products", {
        headers: {
          Authorization: user.token,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async () => {
    if (!name || !description || !price || !stock) {
      alert("Preencha todos os campos antes de criar um produto.");
      return;
    }

    try {
      await apiFood.post(
        "/product",
        {
          name,
          description,
          price,
          stock,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      getProducts();
      alert("Produto Criado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Criar</Typography>
        <Switch checked={isToEdit} onChange={(event) => setIsToEdit(event.target.checked)} />
        <Typography>Editar</Typography>
      </Box>
      {isToEdit ? (
        <Box>
          <Box>
            <Typography>
              Produto selecionado:{" "}
              {selectedProduct ? selectedProduct.name : "Nenhum produto selecionado"}
            </Typography>
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              label="Nome"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              label="Descrição"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              label="Preço"
              variant="outlined"
              type="number"
              fullWidth
            />
            <TextField
              value={stock}
              onChange={(event) => setStock(Number(event.target.value))}
              label="Estoque"
              variant="outlined"
              type="number"
              fullWidth
            />
          </Box>

          {selectedProduct ? (
            <ImageUpload path={`/uploadToProduct/${selectedProduct.id}`} onClick={getProducts} />
          ) : null}

          <Button variant="contained" onClick={() => updateProduct()}>
            Editar
          </Button>

          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={
                      product.image_url
                        ? `${apiFood.defaults.baseURL}/${product.image_url}`
                        : "https://camo.githubusercontent.com/b7b7dca15c743879821e7cfc14e8034ecee3588e221de0a6f436423e304d95f5/68747470733a2f2f7a7562652e696f2f66696c65732f706f722d756d612d626f612d63617573612f33363664616462316461323032353338616531333332396261333464393030362d696d6167652e706e67"
                    }
                    alt={`Imagem do ${product.name}`}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      marginBottom: "16px",
                    }}
                  />
                  <Typography>Nome: {product.name}</Typography>
                  <Typography>Descrição: {product.description}</Typography>
                  <Typography>Preço: {product.price}</Typography>
                  <Typography>Estoque: {product.stock}</Typography>
                  <Button variant="contained" onClick={() => selectProduct(product)}>
                    Selecionar para editar
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "500px",
            margin: "0 auto",
            gap: "16px",
          }}
        >
          <Typography>Criar produto</Typography>
          <TextField
            value={name}
            onChange={(event) => setName(event.target.value)}
            label="Nome"
            variant="outlined"
            fullWidth
          />
          <TextField
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            label="Descrição"
            variant="outlined"
            fullWidth
          />
          <TextField
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            label="Preço"
            variant="outlined"
            type="number"
            fullWidth
          />
          <TextField
            value={stock}
            onChange={(event) => setStock(Number(event.target.value))}
            label="Estoque"
            variant="outlined"
            type="number"
            fullWidth
          />

          <Button variant="contained" onClick={createProduct}>
            Criar
          </Button>
        </Box>
      )}
    </Box>
  );
};
