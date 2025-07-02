import React, {
  useState, useEffect, useContext, createContext,
  useReducer, useRef, useLayoutEffect
} from 'react';
import {
  PaymentElement, Elements, useStripe, useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'

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

const createSubscription = async () => {
  try {
    const response = await axios.post(`${conf.api.url}/subscriptions/metered/create`, { }, {
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

const createMeterEvent = async () => {
  try {
    const response = await axios.post(`${conf.api.url}/subscriptions/metered/meter`, { }, {
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
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        <button onClick={() => prev()} disabled={currentStep == 0}>
          Previous
        </button>
        {currentStep < steps.length - 1 && (
          <button
            style={{ margin: '0 8px' }}
            type="primary"
            onClick={() => next()}
          >
            Next
          </button>
        )}
        {currentStep === steps.length - 1 && (
          <button
            type="primary"
            style={{ margin: '0 8px' }}
            onClick={() => alert('Processing complete!')}
          >
            Done
          </button>
        )}
      </div>

      <StatusMessages messages={messages} />
    </>
  );
};

const CreateSubscriptionForm = () => {
  return (
    <>
      <h1 level={4}>Create a Subscription</h1>
    </>
  );
};

const CreateMeterEventForm = () => {
  const { addMessage } = useSession();
  const [meterEventValue, setMeterEventValue] = React.useState(0);
  const performCreateMeterEvent = async () => {
    addMessage('🔄 Creating a meter event...');
    const response = await createMeterEvent();
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
      <h1 level={4}>Create a Meter Event</h1>
      <button onClick={performCreateMeterEvent}>Submit event</button>
    </>
  );
};


const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [messages, addMessage] = useMessages();
  // For publishable key
  const [publishableKey, setPublishableKey] = useState(null);

  // For customer creation
  const [customerId, setCustomerId] = useState(null);

  // For subscription creation
  const [clientSecret, setClientSecret] = useState(null);

  return (
    <SessionContext.Provider
      value={{
        messages,
        addMessage,
        publishableKey,
        setPublishableKey,
        name,
        customerId,
        setCustomerId,
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
      <h1 level={4}>Collect a Payment Method</h1>
      <PaymentElement />
      <button onClick={performConfirmSetup}>Confirm</button>
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
    name,
    customerId,
    setCustomerId,
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

  const performCreateSubscription = async () => {
    addMessage('🔄 Creating a Subscription...');
    const response = await createSubscription();
    const { meter, price, subscription, error } = response;
    console.log('meter:', meter)
    console.log('price:', price)
    console.log('subscription:', subscription)
    if (subscription) {
      addMessage(`✅ Created subscription: ${subscription.id}`);
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
      <h1>Usage Based Subscription Demo</h1>
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
