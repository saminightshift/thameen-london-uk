import {Button, Text, OrderCard} from '~/components';

export function AccountOrderHistory({orders}) {
  return (
    <div className="mt-6">
      <div className="grid w-full gap-4 p-4 py-6">
        <h2 className="title title__md-semibold">Order History</h2>
        {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div>
      <Text className="mb-4 text text__md" as="p">
        You haven&apos;t placed any orders yet.
      </Text>
      <div className="my-2">
        <button className="btn lg-btn-solid">Start Shopping</button>
      </div>
    </div>
  );
}

function Orders({orders}) {
  return (
    <ul className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}
