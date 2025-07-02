import React, {
  useState, useEffect, useContext, createContext,
  useReducer, useRef, useLayoutEffect
} from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'

// TODO: Uninstall antd
import 'antd/dist/antd.min.css';
import {
  Typography, Steps, Button, message,
  Input, Row, Col, Select, InputNumber,
 } from 'antd';
const { Title } = Typography;
const { Option } = Select;

import conf from './conf'

const retrievePublishableKey = async () => {
  try {
    const res = await fetch(`${conf.api.url}/subscriptions/config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    return { error };
  }
};
{/* const createCustomer = async (name, email) => { */}
{/*   try { */}
{/*     const res = await fetch(`${conf.api.url}/subscriptions/create-customer`, { */}
{/*       method: 'POST', */}
{/*       headers: { */}
{/*         'Content-Type': 'application/json', */}
{/*         accepts: 'application/json', */}
{/*       }, */}
{/*       body: JSON.stringify({ name, email }), */}
{/*     }); */}
{/*     return await res.json(); */}
{/*   } catch (error) { */}
{/*     return { error }; */}
{/*   } */}
{/* }; */}

const createMeter = async (displayName, eventName, aggregationFormula) => {
  try {
    {/* const res = await fetch(`${conf.api.url}/subscriptions/create-meter`, { */}
    {/*   method: 'POST', */}
    {/*   headers: { */}
    {/*     'Content-Type': 'application/json', */}
    {/*     accepts: 'application/json', */}
    {/*   }, */}
    {/*   body: JSON.stringify({ */}
    {/*     displayName, eventName, aggregationFormula */}
    {/*   }), */}
    {/* }); */}
    {/* return await res.json(); */}

    const response = await axios.post(`${conf.api.url}/subscriptions/create-meter`, {
      displayName, eventName, aggregationFormula
    }, {
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
      },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return { error };
  }
};

const createPrice = async (meterId, currency, amount, productName) => {
  try {
    {/* const res = await fetch(`${conf.api.url}/subscriptions/create-price`, { */}
    {/*   method: 'POST', */}
    {/*   headers: { */}
    {/*     'Content-Type': 'application/json', */}
    {/*     accepts: 'application/json', */}
    {/*   }, */}
    {/*   body: JSON.stringify({ meterId, currency, amount, productName }), */}
    {/* }); */}
    {/* return await res.json(); */}

    const response = await axios.post(`${conf.api.url}/subscriptions/create-price`, {
      meterId, currency, amount, productName,
    }, {
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
      },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return { error };
  }
};

const createSubscription = async (customerId, priceId) => {
  try {
    {/* const res = await fetch(`${conf.api.url}/subscriptions/create-subscription`, { */}
    {/*   method: 'POST', */}
    {/*   headers: { */}
    {/*     'Content-Type': 'application/json', */}
    {/*     accepts: 'application/json', */}
    {/*   }, */}
    {/*   body: JSON.stringify({ customerId, priceId }), */}
    {/* }); */}
    {/* const json = await res.json(); */}
    {/* console.log('res:', res, ', json:', json) */}
    {/* return json */}

    const response = await axios.post(`${conf.api.url}/subscriptions/create-subscription`, {
      // customerId, priceId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
      },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return { error };
  }
};

const createMeterEvent = async (eventName, customerId, value) => {
  try {
    {/* const res = await fetch(`${conf.api.url}/subscriptions/create-meter-event`, { */}
    {/*   method: 'POST', */}
    {/*   headers: { */}
    {/*     'Content-Type': 'application/json', */}
    {/*     accepts: 'application/json', */}
    {/*   }, */}
    {/*   body: JSON.stringify({ eventName, customerId, value }), */}
    {/* }); */}
    {/* return await res.json(); */}

    const response = await axios.post(`${conf.api.url}/subscriptions/create-meter-event`, {
      eventName, customerId, value,
    }, {
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
      },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return { error };
  }
};






const StatusMessages = ({ messages }) => {
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  return messages.length ? (
    <div ref={scrollRef} id="messages" role="alert">
      {messages.map((m, i) => (
        <div key={i}>{maybeLink(m)}</div>
      ))}
    </div>
  ) : (
    ''
  );
};

const maybeLink = (m) => {
  let dashboardBase = '';
  if (m.includes('cus_'))
    dashboardBase = 'https://dashboard.stripe.com/test/customers/';
  else if (m.includes('sub_')) {
    dashboardBase = 'https://dashboard.stripe.com/test/subscriptions/';
  } else if (m.includes('mtr_')) {
    dashboardBase = 'https://dashboard.stripe.com/test/meters/';
  } else if (m.includes('price_')) {
    dashboardBase = 'https://dashboard.stripe.com/test/prices/';
  }
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: m.replace(
          /((cus_|sub_|mtr_|price_)(\S*)\b)/g,
          `<a href="${dashboardBase}$1" target="_blank">$1</a>`
        ),
      }}
    ></span>
  );
};

const useMessages = () => {
  return useReducer((messages, message) => {
    return [...messages, message];
  }, []);
};





const FlowContainer = ({ steps, messages, currentStep, setCurrentStep }) => {
  const next = async () => {
    const task = steps[currentStep].task;
    if (task) {
      const taskResult = await task();
      if (taskResult) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Steps current={currentStep} items={steps} />
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        <Button onClick={() => prev()} disabled={currentStep == 0}>
          Previous
        </Button>
        {currentStep < steps.length - 1 && (
          <Button
            style={{ margin: '0 8px' }}
            type="primary"
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            style={{ margin: '0 8px' }}
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
      </div>

      <StatusMessages messages={messages} />
    </>
  );
};



const CreateCustomerForm = () => {
  const { name, setName, email, setEmail } = useSession();

  return (
    <>
      <Title level={4}>Create a Customer</Title>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Customer name</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Row>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Customer email</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Row>
    </>
  );
};



const CreateMeterForm = () => {
  const {
    displayName,
    setDisplayName,
    eventName,
    setEventName,
    aggregationFormula,
    setAggregationFormula,
  } = useSession();

  return (
    <>
      <Title level={4}>Create a Meter</Title>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Display name</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </Row>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Event name</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </Row>
      <Row align="middle">
        <Col span={8}>
          <Title level={5}>Aggregation formula</Title>
        </Col>
        <Select
          style={{ width: '50%' }}
          onChange={(newValue) => {
            setAggregationFormula(newValue);
          }}
          value={aggregationFormula}
        >
          {['sum', 'count'].map((aggregationFormula) => (
            <Option key={aggregationFormula} value={aggregationFormula}>
              {aggregationFormula}
            </Option>
          ))}
        </Select>
      </Row>
    </>
  );
};

const CreatePriceForm = () => {
  const {
    currency,
    setCurrency,
    amount,
    setAmount,
    productName,
    setProductName,
  } = useSession();

  return (
    <>
      <Title level={4}>Create a Price</Title>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Product name</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </Row>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Currency</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </Row>
      <Row align="middle">
        <Col span={8}>
          <Title level={5}>Unit amount (in cents)</Title>
        </Col>
        <InputNumber
          style={{
            width: '50%',
          }}
          value={amount}
          onChange={(value) => setAmount(value)}
        />
      </Row>
    </>
  );
};


const CreateSubscriptionForm = () => {
  const { customerId, priceId } = useSession();

  return (
    <>
      <Title level={4}>Create a Subscription</Title>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Customer</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          disabled
          value={customerId}
        />
      </Row>
      <Row align="middle">
        <Col span={8}>
          <Title level={5}>Price</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          disabled
          value={priceId}
        />
      </Row>
    </>
  );
};



const CreateMeterEventForm = () => {
  const { eventName, customerId, addMessage } = useSession();
  const [meterEventValue, setMeterEventValue] = React.useState(0);
  const performCreateMeterEvent = async () => {
    addMessage('🔄 Creating a meter event...');
    const response = await createMeterEvent(
      eventName,
      customerId,
      meterEventValue
    );
    const { meterEvent, error } = response;
    if (meterEvent) {
      addMessage(`✅ Created meter event: ${meterEvent.identifier}`);
      return true;
    }
    if (error) {
      addMessage(`❌ Error creating meter event: ${error.message}`);
      return false;
    }
  };

  return (
    <>
      <Title level={4}>Create a Meter Event</Title>
      <Row align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>
          <Title level={5}>Event name</Title>
        </Col>
        <Input
          style={{
            width: '50%',
          }}
          disabled
          value={eventName}
        />
      </Row>

      <Row align="middle">
        <Col span={8}>
          <Title level={5}>Value</Title>
        </Col>
        <InputNumber
          style={{
            width: '50%',
          }}
          value={meterEventValue}
          onChange={(value) => setMeterEventValue(value)}
        />
      </Row>
      <Row align="middle">
        <Col span={8}>
          <Button onClick={performCreateMeterEvent}>Submit event</Button>
        </Col>
      </Row>
    </>
  );
};


const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [messages, addMessage] = useMessages();
  // For publishable key
  const [publishableKey, setPublishableKey] = useState(null);

  // For customer creation
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  // For meter creation
  const [displayName, setDisplayName] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [aggregationFormula, setAggregationFormula] = useState('sum');
  const [meterId, setMeterId] = useState(null);

  // For price creation
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState(null);
  const [productName, setProductName] = useState(null);
  const [priceId, setPriceId] = useState(null);

  // For subscription creation
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  return (
    <SessionContext.Provider
      value={{
        messages,
        addMessage,
        //publishable key
        publishableKey,
        setPublishableKey,
        // customer
        name,
        setName,
        email,
        setEmail,
        customerId,
        setCustomerId,
        // meter
        displayName,
        setDisplayName,
        eventName,
        setEventName,
        aggregationFormula,
        setAggregationFormula,
        meterId,
        setMeterId,
        // price
        currency,
        setCurrency,
        amount,
        setAmount,
        productName,
        setProductName,
        priceId,
        setPriceId,
        // subscription
        subscriptionId,
        setSubscriptionId,
        clientSecret,
        setClientSecret,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);


const SetupForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { addMessage } = useSession();

  const performConfirmSetup = async () => {
    addMessage('🔄 Confirming Setup Intent...');
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: 'http://localhost:1234',
      },
      redirect: 'if_required',
    });
    if (error) {
      addMessage(`❌ Error confirming setup intent: ${error.message}`);
    } else {
      addMessage('✅ Confirmed Setup Intent');
    }
  };

  return (
    <>
      <Title level={4}>Collect a Payment Method</Title>
      <PaymentElement />
      <Row align="middle">
        <Col span={8}>
          <Button onClick={performConfirmSetup}>Confirm</Button>
        </Col>
      </Row>
    </>
  );
};
const CollectPaymentMethodForm = () => {
  const { publishableKey, clientSecret } = useSession();

  return (
    <Elements
      stripe={loadStripe(publishableKey)}
      options={{
        clientSecret,
      }}
    >
      <SetupForm />
    </Elements>
  );
};



const UsageBasedSubscriptionFlow = () => {
  const {
    setPublishableKey,
    displayName,
    eventName,
    aggregationFormula,
    setMeterId,
    setEventName,
    meterId,
    name,
    email,
    customerId,
    setCustomerId,
    currency,
    amount,
    productName,
    priceId,
    setPriceId,
    setSubscriptionId,
    setClientSecret,
    addMessage,
    messages,
  } = useSession();

  React.useEffect(async () => {
    const response = await retrievePublishableKey();
    const { publishableKey, error } = response;
    if (publishableKey) {
      addMessage('🔑 Retrieved publishable key');
      setPublishableKey(publishableKey);
    }
    if (error) {
      addMessage(
        `😱 Failed to retrieve publisable key. Is your server running?`
      );
    }
  }, []);

  const [currentStep, setCurrentStep] = React.useState(0);

  const performCreateCustomer = async () => {
    addMessage('OK')
    setCustomerId('customer-id')
    return true
    {/* addMessage('🔄 Creating a Customer...'); */}
    {/* const response = await createCustomer(name, email); */}
    {/* const { customer, error } = response; */}
    {/* if (customer) { */}
    {/*   addMessage(`✅ Created customer: ${customer.id}`); */}
    {/*   setCustomerId(customer.id); */}
    {/*   return true; */}
    {/* } */}
    {/* if (error) { */}
    {/*   addMessage(`❌ Error creating customer: ${error.message}`); */}
    {/*   return false; */}
    {/* } */}
  };

  const performCreateMeter = async () => {
    addMessage(`✅`);
    setMeterId('meter-id');
    return true

    {/* addMessage('🔄 Creating a Meter...'); */}
    {/* const response = await createMeter( */}
    {/*   displayName, */}
    {/*   eventName, */}
    {/*   aggregationFormula */}
    {/* ); */}
    {/* const { meter, error } = response; */}
    {/* if (meter) { */}
    {/*   addMessage(`✅ Created meter: ${meter.id}`); */}
    {/*   setMeterId(meter.id); */}
    {/*   return true; */}
    {/* } */}
    {/* if (error) { */}
    {/*   addMessage(`❌ Error creating meter: ${error.message}`); */}
    {/*   return false; */}
    {/* } */}
  };

  const performCreatePrice = async () => {
    addMessage(`✅`);
    setPriceId('price-id');
    return true

    {/* addMessage('🔄 Creating a Price...'); */}
    {/* const response = await createPrice(meterId, currency, amount, productName); */}
    {/* const { price, error } = response; */}
    {/* if (price) { */}
    {/*   addMessage(`✅ Created price: ${price.id}`); */}
    {/*   setPriceId(price.id); */}
    {/*   return true; */}
    {/* } */}
    {/* if (error) { */}
    {/*   addMessage(`❌ Error creating price: ${error.message}`); */}
    {/*   return false; */}
    {/* } */}
  };

  const performCreateSubscription = async () => {
    addMessage('🔄 Creating a Subscription...');
    const response = await createSubscription(customerId, priceId);
    const { meter, price, subscription, error } = response;
    console.log('meter:', meter)
    console.log('price:', price)
    console.log('subscription:', subscription)
    if (subscription) {
      addMessage(`✅ Created subscription: ${subscription.id}`);
      setMeterId(meter.id);
      setEventName(meter.event_name);
      setPriceId(price.id);
      setSubscriptionId(subscription.id);
      setClientSecret(subscription.pending_setup_intent.client_secret);
      return true;
    }
    if (error) {
      addMessage(`❌ Error creating subscription: ${error.message}`);
      return false;
    }
  };

  const buildSteps = () => {
    return [
      {
        title: 'Customer',
        content: <CreateCustomerForm />,
        task: performCreateCustomer,
      },
      {
        title: 'Meter',
        content: <CreateMeterForm />,
        task: performCreateMeter,
      },
      {
        title: 'Price',
        content: <CreatePriceForm />,
        task: performCreatePrice,
      },
      {
        title: 'Subscription',
        content: <CreateSubscriptionForm />,
        task: performCreateSubscription,
      },
      {
        title: 'Payment Method',
        content: <CollectPaymentMethodForm />,
      },
      {
        title: 'Meter Event',
        content: <CreateMeterEventForm />,
      },
    ];
  };

  return (
    <>
      <Title>Usage Based Subscription Demo</Title>
      <FlowContainer
        steps={buildSteps()}
        messages={messages}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
};

const Metered = () => {
  return (
    <SessionProvider>
      <UsageBasedSubscriptionFlow />
    </SessionProvider>
  );
};

export default Metered;
