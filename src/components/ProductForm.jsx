import { useMutation, useQueryClient, useQuery, useBaseQuery} from "@tanstack/react-query";
import { createProduct, updateProduct } from "../api/productsAPI";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { useQueries } from "react-query";

function ProductForm({ valor }) {

  function borrarContenido() {
    var nombreInput = document.getElementById("name");
    var descInput = document.getElementById("description");
    var priceInput = document.getElementById("price");
    var exsitInput = document.getElementById("exist");
  
    nombreInput.value = "";
    descInput.value = ""; 
    priceInput.value = "";
    exsitInput.value = "";
  
  }
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log('Product added!');
      Swal.fire('Producto agregado!', '', 'success');
      borrarContenido();
      queryClient.invalidateQueries('products')
    }
  });

  let v = valor;
  function useProd(v){
    return useBaseQuery(["post", v], () => updateProduct(v), {
      enabled: !!v,
    });
  }

  const { data } = useProd(v);

  console.log("🚀 ~ file: ProductForm.jsx:41 ~ ProductForm ~ data:", data);
  
  
  // const {data: prod} = useQuery({
  //   queryKey: v,
  //   queryFn: updateProduct,
  // });
  // console.log("🚀 ~ file: ProductForm.jsx:38 ~ ProductForm ~ prod:", prod);
  

  // const {isLoading, data: products, isError, error} = useQuery({
  //   queryKey: ['products'],
  //   queryFn: getProducts,
  //   select: products => products.sort((a, b) => b.id - a.id)
  // });


  // let updateProductMutation = async (v) => {
  //   await updateProduct(v);
  //   // console.log("🚀 ~ file: Products.jsx:28 ~ updateProductMutation ~ prod:", prod);
  // }
  // console.log("🚀 ~ file: ProductForm.jsx:39 ~ updateProductMutation ~ updateProductMutation:", updateProductMutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
    });
  }
  return (
    
    <div>
      <h1>Listado de productos</h1>
      <form onSubmit={handleSubmit}>

        <div class="input-group">
          <input type="text" id="name" name="name" class="input-group__input" required />
          <label for="name" htmlFor="name" class="input-group__label">Nombre</label>
        </div>

        <div class="input-group">
          <input type="text" id="description" name="description" class="input-group__input" required />
          <label for="description" htmlFor="description" class="input-group__label">Descripción</label>
        </div>

        <div class="input-group">
          <input type="text" id="price" name="price" class="input-group__input" required />
          <label for="price" htmlFor="price" class="input-group__label">Precio</label>
        </div>

        <div class="input-group">
          <input type="text" id="exist" name="exist" class="input-group__input" required />
          <label for="exist" htmlFor="exist" class="input-group__label">Existencia</label>
        </div>

        <button id="add">
          Añadir producto
        </button>
      </form>
    </div>
  )
}

export default ProductForm