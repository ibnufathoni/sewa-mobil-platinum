import Header from 'src/components/navbar';
import Footer from 'src/components/footer';
import { Navigate, useMatches, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from 'src/common/API';
import BreadcrumbComp from './components/BreadcrumbComp';
import PaymentTopContent from './components/PaymentTopContent';
import PaymentBodyContent from './components/PaymentBodyContent';
import { toast } from 'react-toastify';

export default function Payment() {
  const matches = useMatches();
  const [dataOrder, setDataOrder] = useState();
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();
  const [listBank, setListBank] = useState({
    bca: false,
    bni: false,
    mandiri: false,
  });

  useEffect(() => {
    const tokenCustomer = localStorage.getItem('tokenCustomer');
    if (!tokenCustomer) return navigate('/');
    function getOrderById() {
      const id = matches[0].params.id;
      API.get(`customer/order/${id}`)
        .then(res => {
          const data = res.data;
          setDataOrder(data);
        })
        .catch(e => toast.error(e));
    }
    getOrderById();
  }, [matches, navigate]);

  return (
    <>
      {btn && <Navigate to={`/cart/payment-detail/${matches[0].params.id}`} state={{ listBank }} />}
      <Header />
      <BreadcrumbComp title="Pembayaran" />
      <PaymentTopContent dataOrder={dataOrder} />
      <PaymentBodyContent
        listBank={listBank}
        setListBank={setListBank}
        dataOrder={dataOrder}
        setBtn={setBtn}
      />

      <Footer />
    </>
  );
}
