import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface OrderHistory {
  id: string;
  user_id: string;
  created_at: string;
}

function Order() {
  const [orderItems, setOrderItems] = useState<OrderHistory[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await fetch('http://localhost:3333/orders', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
          }) 

        .then(res => res.json())
        .then(data => setOrderItems(data.orders))


      } catch (error) {
        console.error('Erro ao obter os pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
        <h1 className="mt-5">Meu Histórico de Compras</h1>
        <div>
          {orderItems.map((Order) => (
            <div key={Order.id} className="card mt-3">
              <div className="card-body">
                <h3 className="card-title">{Order.user_id}</h3>
                <p className="card-text">{Order.created_at}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Order;