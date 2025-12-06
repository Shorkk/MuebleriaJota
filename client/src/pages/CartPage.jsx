import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { crearPedido } from '../service/orderService';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartPage = () => {
    const {
        cartItems,
        vaciarCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        totalCarrito
    } = useCartContext();

    const { isAuthenticated, token } = useAuthContext()
    const navigate = useNavigate();
    let carritoConfirm = { items:[...cartItems],estado:"pendiente"}


// const payload = { items: itemsForBackend, estado: 'confirmado' };
// await crearPedido(payload, token);

    const handleFinalizarCompra = async () => {
        if(confirm("¿Desea finalizar la compra?")){
            const itemsForBackend = cartItems.map(ci => ({
                productId: ci.id,
                cantidad: ci.cantidad || 1
                }));
            carritoConfirm = {items: itemsForBackend, estado:"confirmado"}
            try {
                await crearPedido(carritoConfirm, token);
                toast.success("Compra realizada con éxito");
                vaciarCarrito();
                navigate('/');
            } catch (error) {
                console.error("Error al crear el pedido:", error);
                toast.error("Hubo un error al procesar su compra. Intente nuevamente.");
            }
        }
    }

    const handlerMisPedidos = () => {
        if (!isAuthenticated) {
            navigate('/login', {state: { from: '/cart' }});
            return;
        } else {
            navigate('/mis-pedidos', { state: { from: '/cart' } });
        }
    }

const OrderCard = ({ item }) => {
  return (
    <div className="card">
      <img src={item.imagen || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?b=1&s=612x612&w=0&k=20&c=10Oc-M2aMCHKYLd-BykQnG-k6xXD4JugfY7TVaapL4U="} alt={item.nombre} />
      <h2>{item.nombre}</h2>
      <p><strong>${item.precio}</strong></p>
      <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} disabled={item.cantidad === 1}>
        <FaMinus /></button>
        <span><strong>{item.cantidad}</strong></span>
        <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>
        <FaPlus /></button>
        <button className="button_eliminar" onClick={() => eliminarDelCarrito(item.id)}><FaTrashAlt /></button>
    </div>
  );
};

    return (
        <>
            <button className="button_order" onClick={handlerMisPedidos}>Mis Pedidos</button>
            <h1>Mi Carrito</h1>
            {cartItems.length === 0 ? (
                <h4>El carrito está vacío.</h4>
            ) : (
                <>
                <div className="productos-grid">
                    {cartItems.map(item => (
                    <OrderCard 
                        item={item} key={item.id}
                    />
                    ))}
                </div>
                    <h2>Resumen del Carrito</h2>
                        <div className="cart-summary">
                        <p>Total: <strong>${totalCarrito}</strong></p>
                        <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
                        <button className='button_eliminar' onClick={vaciarCarrito}>Vaciar Carrito</button>
                </div>
            </>
            )}
        </>
    );
}

export default CartPage;

