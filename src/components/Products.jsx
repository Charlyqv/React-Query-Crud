import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct, updateProduct } from '../api/productsAPI';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';


function Products({ setValor }) {
  const handleClick = (id) => {
    setValor(id);
  }

  const queryClient = useQueryClient();

  const {isLoading, data: products, isError, error} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => b.id - a.id)
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      Swal.fire('Producto eliminado!', '', 'success');
      queryClient.invalidateQueries('products')
    }
  });

  // let updateProductMutation = async (v) => {
  //     await updateProduct(v);
  //     console.log("🚀 ~ file: Products.jsx:28 ~ updateProductMutation ~ prod:", prod);
  //   }

  const prod ='';

  function updateProductMutation(id){
    // console.log("🚀 ~ file: Products.jsx:38 ~ updateProductMutation ~ id:", id);
    const prod = async (id) => {
      await updateProduct(id);
      console.log("🚀 ~ file: Products.jsx:28 ~ updateProductMutation ~ prod:", prod);
    }
    
    // const {data:prod} = useQuery({
    //   queryKey: ['product', id],
    //   queryFn: async () => {
    //     updateProduct(id)
    //   }
    // })
  }
  console.log("🚀 ~ file: Products.jsx:32 ~ updateProductMutation ~ prod:", prod);
    
  if (isLoading) return <div>Loading...</div>
  else if (isError) return <div>Error: {error.message}</div>

  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Existencia</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {
          products.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  {product.name}
                </td>
                <td>
                  {product.description}
                </td>
                <td>
                  {product.price}
                </td>
                <td>
                  {product.exist}
                </td>
                <td>
                  <button 
                    id="update" 
                    onClick={() => 
                      updateProductMutation(product.id)}>
                  Editar</button>

                  <button id="delete" onClick={() => {
                    deleteProductMutation.mutate(product.id);
                  }}>Borrar</button>
                </td>

              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
  
}

export default Products;
