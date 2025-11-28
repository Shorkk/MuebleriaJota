import { useCartContext } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { crearPedido } from '../service/orderService';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';

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

    const handleFinalizarCompra = async () => {
        if (!isAuthenticated) {
            navigate('/login', {state: { from: '/cart' }});
            return;
        }

        if(confirm("¿Desea finalizar la compra?")){
            carritoConfirm = {items:[...cartItems],estado:"confirmado"}
            try {
                const response = await crearPedido(carritoConfirm, token);
                alert("Compra realizada con éxito");
                vaciarCarrito();
                navigate('/');
            } catch (error) {
                console.error("Error al crear el pedido:", error);
                alert("Hubo un error al procesar su compra. Intente nuevamente.");
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

    return (
        <div className ="cart-page">
            <button onClick={handlerMisPedidos}>Mis Pedidos</button>
            <h1>Mi Carrito</h1>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div className="cart-container">
                    <div className="cart-list">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <span className ="item-name">{item.nombre}</span>
                                <span className ="item-price">${item.precio}</span>
                                <div className="item-quantity">
                                    <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} disabled={item.cantidad === 1}>
                                        <FaMinus />
                                    </button>
                                    <span>{item.cantidad}</span>
                                    <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <button className="remove-item" onClick={() => eliminarDelCarrito(item.id)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Resumen del Carrito</h2>
                        <p>Total: ${totalCarrito}</p>
                        <button className="cart-finish" onClick={handleFinalizarCompra}>Finalizar Compra</button>
                        <button className="cart-empty" onClick={vaciarCarrito}>Vaciar Carrito</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;

