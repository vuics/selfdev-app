import React, { useState, useEffect } from 'react'
import {
  Dropdown,
} from 'semantic-ui-react'
import i18n from "i18next";
// import detector from "i18next-browser-languagedetector";
// import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import conf from './conf'

const language = localStorage.getItem('i18n.language') || 'en-US'

const languageOptions = [
  { key: 'en-US', value: 'en-US', flag: 'us', text: 'English' },
  { key: 'ru-RU', value: 'ru-RU', flag: 'ru', text: 'Русский' },
]

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  'en-US': {
    translation: {
    },
    app: {
      'name': conf.app.name,
    },
    Home: {
      'Open-source Agentic AI': 'Open-source Agentic AI',
      'Supercharges Entrepreneurial Dreams': 'Supercharges Entrepreneurial Dreams',
      'Autopilot your business. Focus on what you love.': 'Autopilot your business. Focus on what you love.',
      'Powered by Self-developing': 'Powered by Self-developing',
      'Start for free': 'Start for free',
      'Join a waitlist': 'Join a waitlist',
      'Star on GitHub': 'Star on GitHub',
      'Your Toolkit for Building an Autonomous Business': 'Your Toolkit for Building an Autonomous Business',
      'Map': 'Map',
      'Hive': 'Hive',
      'Chat': 'Chat',
      'Many More': 'Many More',
      'The Visual Command Center for Agentic Collaboration. Visually orchestrate agents and human resources, design complex workflows, connect prompts, control execution, and create compelling presentations—all within a user-friendly, no-code/low-code environment.': 'The Visual Command Center for Agentic Collaboration. Visually orchestrate agents and human resources, design complex workflows, connect prompts, control execution, and create compelling presentations—all within a user-friendly, no-code/low-code environment.',
      'LLM Power': 'LLM Power',
      'Chat, RAG (train on your data), Speech-to-text, Text-to-speech': 'Chat, RAG (train on your data), Speech-to-text, Text-to-speech',
      'Creative & Visual': 'Creative & Visual',
      'ImageGen, Avatar': 'ImageGen, Avatar',
      'Technical Prowess:': 'Technical Prowess:',
      'Code, Quantum, Storage, Command': 'Code, Quantum, Storage, Command',
      'Workflow Integration:': 'Workflow Integration:',
      'LangFlow, Node-RED, Notebook': 'LangFlow, Node-RED, Notebook',
      'Seamlessly communicate with agents, humans, and mixed teams in private channels and group discussions.': 'Seamlessly communicate with agents, humans, and mixed teams in private channels and group discussions.',
      'API & CLI:': 'API & CLI:',
      'Access platform features programmatically for advanced customization and seamless integration.': 'Access platform features programmatically for advanced customization and seamless integration.',
      'Mobile & Desktop Apps': 'Mobile & Desktop Apps',
      'Stay connected and manage your agents on the go with our iOS, Android, macOS, Linux, and Windows apps.': 'Stay connected and manage your agents on the go with our iOS, Android, macOS, Linux, and Windows apps.',
      'Docs': 'Docs',
      'Comprehensive documentation and tutorials to guide you from setup to advanced agentic strategies.': 'Comprehensive documentation and tutorials to guide you from setup to advanced agentic strategies.',
      'Imagine a World Where Your Business Runs Itself': 'Imagine a World Where Your Business Runs Itself',
      'Tired of being bogged down in repetitive tasks?': 'Tired of being bogged down in repetitive tasks?',
      'Dreaming of scaling your business without the endless grind?': 'Dreaming of scaling your business without the endless grind?',
      'makes it possible.': 'makes it possible.',
      'We are building a future where intelligent AI agents work alongside you, automating the mundane, amplifying your creativity, and unlocking unprecedented growth.': 'We are building a future where intelligent AI agents work alongside you, automating the mundane, amplifying your creativity, and unlocking unprecedented growth.',

      virtualStartupTeamsTitle: "Virtual Startup Teams",
      virtualStartupTeamsDesc: "Experience unparalleled growth with virtual teams designed to assist your business in automating workflows and cutting costs.",

      reclaimYourTimeTitle: "Reclaim Your Time",
      reclaimYourTimeDesc: "Delegate tedious tasks to tireless AI agents, freeing you to focus on strategic vision and high-impact decisions.",

      scaleEffortlesslyTitle: "Scale Effortlessly",
      scaleEffortlesslyDesc: "Expand your business capabilities without the limitations of traditional hiring. Build virtual teams that work 24/7.",

      reduceCostsTitle: "Reduce Costs & Maximize Efficiency",
      reduceCostsDesc: "Optimize workflows and eliminate inefficiencies with intelligent automation, boosting your bottom line.",

      unlockInsightsTitle: "Unlock Data-Driven Insights",
      unlockInsightsDesc: "Leverage AI-powered analytics to understand your business better and make smarter, more informed decisions.",

      buildDreamBusinessTitle: "Build the Business of Your Dreams",
      buildDreamBusinessDesc: "Focus on your passion, knowing that {{appName}} is always working in the background to support your vision.",


      aiDreamTeamTitle: "Meet Your AI Dream Team: Agent Archetypes for Every Task",

      archetypeChat: "Chat",
      archetypeRAG: "RAG",
      archetypeSpeech: "Speech <-> Text",
      archetypeImageGen: "ImageGen",
      archetypeCode: "Code",
      archetypeOthers: "Many More",

      archetypeChatDesc: "Interact with leading LLMs from OpenAI, Anthropic, Google, and more.",
      archetypeRAGDesc: "Train LLMs on your data to create highly specialized knowledge bases.",
      archetypeSpeechDesc: "Enable voice-powered workflows and accessibility.",
      archetypeImageGenDesc: "Create stunning visuals with Dalle-2 and Dalle-3.",
      archetypeCodeDesc: "Automate complex programming tasks and streamline development.",
      archetypeOthersDesc: "Quantum, Storage, Command, Langflow, Node-RED, Notebook, Avatar.",


      scaleWithSecurityTitle: "Scale with security",
      scaleWithSecurityDesc: "Securely store your API keys and credentials in <strong>Vault</strong> with robust encryption, ensuring the safety of your data and integrations.",


      startBuildingTitle: "Start Building Your Autonomous Future Today - It's Free!",

      openSourceTitle: "Open-Source",
      openSourceDesc: "Self-host the platform and run unlimited agents for free.",

      freeTierTitle: "Free Tier",
      freeTierDesc: "Run up to 3 agents simultaneously on our cloud-hosted platform.",

      cloudDeploymentTitle: "Cloud Deployment",
      cloudDeploymentDesc: "Hassle-free hosting and management of your {{appName}} platform.",

      starOnGithub: "Star on GitHub",
      startForFree: "Start for free",
      joinWaitlist: "Join a waitlist",


      unlockPremiumTitle: "Unlock the Full Potential with Our Premium Cloud Offering",

      syntheticUITitle: "Synthetic UI",
      syntheticUIDesc: "Dynamically generated and programmatically controlled user interfaces.",

      distributedSystemTitle: "Distributed System",
      distributedSystemDesc: "Connect humans and agents through a server-to-server network.",

      socialBridgeTitle: "Social Bridge",
      socialBridgeDesc: "Integrate agents with social networks and messaging platforms.",

      phoneIntegrationTitle: "Phone Integration",
      phoneIntegrationDesc: "Communicate with agents via phone calls and messages.",

      seePlans: "See our plans",


      futureTitle: "The Future of {{appName}}: A Glimpse into Tomorrow",

      collaborationTitle: "Collaboration & Communication",
      collaborationDesc: "Meet (Video Conferencing) - Seamlessly connect with agents and humans.",

      workflowTitle: "Workflow Automation",
      workflowDesc: "Flow, Node - Design and automate complex workflows visually.",

      aiTrainingTitle: "AI Training & Development",
      aiTrainingDesc: "Train, Note, Code - Empower agents with continuous learning.",

      businessAppsTitle: "Business Applications",
      businessAppsDesc: "Sell (CRM/ERP), E-commerce, Storefront, Bank - Streamline core business functions.",

      emergingTechTitle: "Emerging Technologies",
      emergingTechDesc: "Blockchain, Smart Contract, VR/AR integrations.",


      trailblazerTitle: "Become a Trailblazer in Agentic AI Innovation!",
      trailblazerDesc: "{{appName}} is more than just a platform; it's a vibrant community of innovators, entrepreneurs, and developers building the future of work. Connect with like-minded individuals, share ideas, and contribute to the evolution of agentic AI.",

      joinCommunity: "Join our community",
      viewDocs: "View Documentation",
      contactUs: "Contact us",


      reviewers: {
        AlexanderPavlov: {
          name: "Alexander Pavlov",
          content: "Cool project. The future belongs to these technologies. It solves the tasks in time."
        },
        KateMelnikova: {
          name: "Kate Melnikova",
          content: "The platform allows entrepreneurs to significantly reduce the time spent on supporting current business issues, and most importantly, using new technologies with HiperAgency is easy and does not require a long study of the issue. And even \"from scratch\" of knowledge and ideas about the benefits of AI in your business, you can start using this platform and programming in a common language. It is great to turn from an individual entrepreneur into a developer for the needs of your business, reducing the time spent on explaining the task to outsourcing contractors. You can do the necessary minimum yourself with the help of this wonderful platform."
        },
        DmitriyArakcheev: {
          name: "Dmitriy Arakcheev",
          content: "The best multifunctional platform I have ever seen. I especially like the structure when you can gather many agents that will perform processes between themselves."
        },
        AlekseyArakcheev: {
          name: "Aleksey Arakcheev",
          content: "It helped to solve tasks."
        },
        AslanAtemov: {
          name: "Aslan Atemov",
          content: "The service is convenient and easy to use. Everything works great!"
        },
        JonathanSimons: {
          name: "Jonathan Simons",
          content: "I love these agents."
        },
        AlexanderLabyrich: {
          name: "Alexander Labyrich",
          content: "I tried this system in action. Very convenient interface, which allows you to create different options for executing a request. Lots of possibilities with ease of use!"
        },
        AnnaAgeeva: {
          name: "Anna Ageeva",
          content: "Powerful application. The functionality is amazing, you can simulate any event, game, debate, negotiations... as limitless as your imagination!"
        }
      },
      empoweringTitle: "Empowering the next generation of entrepreneurs."
    },
    ResponsiveContainer: {
      'Docs': 'Docs',
      'Mobile': 'Mobile',
      'Pricing': 'Pricing',
      'Log In': 'Log In',
      'Sign Up': 'Sign Up',
      'Join a Waitlist': 'Join a Waitlist',
      'Mobile App': 'Mobile App',
      'Get Started': 'Get Started',
      'Documentation': 'Documentation',
      'GitHub': 'GitHub',
      'YouTube': 'YouTube',
      'Contact Us': 'Contact Us',
      'Close Sidebar': 'Close Sidebar'
    },
    Footer: {
      'Contact Us': 'Contact Us',
      'GitHub': 'GitHub',
      'LinkedIn': 'LinkedIn',
      'Discord': 'Discord',
      'YouTube': 'YouTube',
      'X': 'X',
      'Platform': 'Platform',
      'Home': 'Home',
      'Documentation': 'Documentation',
      'Pricing': 'Pricing',
      'Security': 'Security',
      'Mobile apps': 'Mobile apps',
      'About Us': 'About Us',
      'slogan': `Self-developing ${conf.app.name} is tailoring to your unique business needs.`,
      'Team': 'Team',
      'Mission': 'Mission',
      'Roadmap': 'Roadmap',
      'Select language': 'Select language',
      'Share': 'Share',
      'QR Code': 'QR Code for Home',
      'Tap QR': 'Tap QR for full screen.',
      'copyright': `© 2024-2025 ${conf.app.company}. All rights reserved.`,
      'Terms of Service': 'Terms of Service',
      'Privacy Policy': 'Privacy Policy',
      'LLMs': 'LLMs',
    },
    Login: {
      'Please enter a valid email address': 'Please enter a valid email address',
      'Please enter a valid password': 'Please enter a valid password',
      'Error logging in.': 'Error logging in.',
      'Log-in to Your Account': 'Log-in to Your Account',
      'E-mail address': 'E-mail address',
      'Password': 'Password',
      'Remember Me': 'Remember Me',
      'Login': 'Login',
      'Forgot password?': 'Forgot password?',
      'New to us?': 'New to us?',
      'Sign Up': 'Sign Up'
    },
    Signup: {
      'The password should satisfy the following criteria': 'The password should satisfy the following criteria',
      'At least one upper case English letter.': 'At least one upper case English letter.',
      'At least one lower case English letter.': 'At least one lower case English letter.',
      'At least one digit.': 'At least one digit.',
      'At least one special character.': 'At least one special character.',
      'Minimum length is 8 characters.': 'Minimum length is 8 characters.',
      'Passwords match.': 'Passwords match.',
      'Please enter a valid first name': 'Please enter a valid first name',
      'Please enter a valid last name': 'Please enter a valid last name',
      'Please enter a valid email address': 'Please enter a valid email address',
      'Please enter a valid phone': 'Please enter a valid phone',
      'Please enter a valid password': 'Please enter a valid password',
      'Please enter passwords that match': 'Please enter passwords that match',
      'Error registering a user account.': 'Error registering a user account.',
      'Create a New Account': 'Create a New Account',
      'Error': 'Error',
      'First Name': 'First Name',
      'Last Name': 'Last Name',
      'E-mail address': 'E-mail address',
      'Phone (optionally)': 'Phone (optionally)',
      'Password': 'Password',
      'Repeat Password': 'Repeat Password',
      'I have read and agree to the': 'I have read and agree to the',
      'terms of service': 'terms of service',
      'and': 'and',
      'privacy policy': 'privacy policy',
      'Sign Up': 'Sign Up',
      'Have an existing account?': 'Have an existing account?',
      'Log In': 'Log In',
    },
    Forgot: {
      'Please enter a valid email address': 'Please enter a valid email address',
      'Error sending a reset link.': 'Error sending a reset link.',
      'Forgot Password?': 'Forgot Password?',
      'Error': 'Error',
      'Info': 'Info',
      'E-mail address': 'E-mail address',
      'Email Me Reset Password Link': 'Email Me Reset Password Link',
      'Remember password?': 'Remember password?',
      'Log In': 'Log In'
    },
    Reset: {
      'Please enter a valid password': 'Please enter a valid password',
      'Please enter passwords that match': 'Please enter passwords that match',
      'Error resetting a password.': 'Error resetting a password.',
      'Reset Password': 'Reset Password',
      'Error': 'Error',
      'New Password': 'New Password',
      'Repeat Password': 'Repeat Password',
      'Reset password': 'Reset password',
      'Remember password?': 'Remember password?',
      'Log In': 'Log In'
    },
    Menubar: {
      'Hive': 'Hive',
      'Chat': 'Chat',
      'Talk': 'Talk',
      'Map': 'Map',
      'Meet': 'Meet',
      'Flow': 'Flow',
      'Node': 'Node',
      'Code': 'Code',
      'Note': 'Note',
      'Sell': 'Sell',
      'Train': 'Train',
      'Docs': 'Docs',
      'Profile': 'Profile',
      'API Keys': 'API Keys',
      'Vault': 'Vault',
      'Subscription': 'Subscription',
      'Settings': 'Settings',
      'Log Out': 'Log Out'
    },
    Chat: {
    },
    Hive: {
      'Error retrieving credentials.': 'Error retrieving credentials.',
      'Error getting agents.': 'Error getting agents.',
      'Error posting agent.': 'Error posting agent.',
      'Error putting agent.': 'Error putting agent.',
      'Error deleting agent.': 'Error deleting agent.',
      'Error downloading agents.': 'Error downloading agents.',
      'Invalid JSON file': 'Invalid JSON file',
      'Please upload a valid JSON file.': 'Please upload a valid JSON file.',
      'Error uploading map.': 'Error uploading map.',
      'Error': 'Error',
      'Info': 'Info',
      'Schema Validation Error': 'Schema Validation Error',
      'Add Agent': 'Add Agent',
      'Download': 'Download',
      'Upload': 'Upload',
      'Archetype': 'Archetype',
      'Options': 'Options',
      'Select Archetype': 'Select Archetype',
      'Not compliant with JSON Schema': 'Not compliant with JSON Schema',
      'JSON Schema error': 'JSON Schema error',
      'Cancel': 'Cancel',
      'Submit': 'Submit',
      'Edit': 'Edit',
      'Delete': 'Delete',
      '(no description)': '(no description)',
      'Deployed': 'Deployed',
      'Update': 'Update'
    },
    Map: {
      'Error getting maps.': 'Error getting maps.',
      'Error posting map.': 'Error posting map.',
      'Error putting map.': 'Error putting map.',
      'Error deleting map.': 'Error deleting map.',
      'Error downloading map.': 'Error downloading map.',
      'Invalid JSON file.': 'Invalid JSON file.',
      'Please upload a valid JSON file.': 'Please upload a valid JSON file.',
      'Error uploading map.': 'Error uploading map.',
      'Error retrieving credentials.': 'Error retrieving credentials.',
      'Please select recipient': 'Please select recipient',
      'Show the Map menu': 'Show the Map menu',
      'Hide the Map menu': 'Hide the Map menu',
      'File': 'File',
      'New': 'New',
      'Save': 'Save',
      'Duplicate': 'Duplicate',
      'Rename': 'Rename',
      'Disable autosave': 'Disable autosave',
      'Enable autosave': 'Enable autosave',
      'Autosave': 'Autosave',
      'Download': 'Download',
      'Upload': 'Upload',
      'Confirm Map Delete': 'Confirm Map Delete',
      'Are you sure you want to delete your map?': 'Are you sure you want to delete your map?',
      'Delete': 'Delete',
      'View': 'View',
      'Show menu': 'Show menu',
      'Show opener': 'Show opener',
      'Show file controls': 'Show file controls',
      'Show layout controls': 'Show layout controls',
      'Show color controls': 'Show color controls',
      'Show execution controls': 'Show execution controls',
      'Show slide controls': 'Show slide controls',
      'Show slides deck sidebar': 'Show slides deck sidebar',
      'Show mini map': 'Show mini map',
      'Show control panel': 'Show control panel',
      'Settings': 'Settings',
      'Code viewer theme': 'Code viewer theme',
      'Code editor theme': 'Code editor theme',
      'Code editor mode': 'Code editor mode',
      'Normal': 'Normal',
      'Vim': 'Vim',
      'Markdown editor options': 'Markdown editor options',
      'Markdown editor (light)': 'Markdown editor (light)',
      'Markdown editor (dark)': 'Markdown editor (dark)',
      'Code editor': 'Code editor',
      'Code editor with preview': 'Code editor with preview',
      'Cancel': 'Cancel',
      'Create a new map': 'Create a new map',
      'Save the map': 'Save the map',
      'Duplicate the map': 'Duplicate the map',
      'Delete the map': 'Delete the map',
      'Download the map': 'Download the map',
      'Upload the map': 'Upload the map',
      'Rename the map': 'Rename the map',
      'Title...': 'Title...',
      'Select a map to open': 'Select a map to open',
      'Top-to-bottom layout': 'Top-to-bottom layout',
      'Left-to-right layout': 'Left-to-right layout',
      'Apply text color to selected notes': 'Apply text color to selected notes',
      'Select text color': 'Select text color',
      'Apply background color to selected notes': 'Apply background color to selected notes',
      'Select background color': 'Select background color',
      'Apply edge color to selected notes': 'Apply edge color to selected notes',
      'Select edge color': 'Select edge color',
      'Select text, background and edge colors by default': 'Select text, background and edge colors by default',
      'Reorder edges': 'Reorder edges',
      'Resume running the map': 'Resume running the map',
      'Pause running the map': 'Pause running the map',
      'Run the map': 'Run the map',
      'Step forward': 'Step forward',
      'Stop running the map': 'Stop running the map',
      'Show slide deck sidebar': 'Show slide deck sidebar',
      'Hide slide deck sidebar': 'Hide slide deck sidebar',
      'Previous slide': 'Previous slide',
      'Next slide': 'Next slide',
      'Select recipient': 'Select recipient',
      'Recipient': 'Recipient',
      '/RegExp/ Condition...': '/RegExp/ Condition...',
      'Add Note': 'Add Note',
      'Loop Selected': 'Loop Selected',
      'Apply': 'Apply',
      'Microphone access denied or not available.': 'Microphone access denied or not available.',
      'Copy': 'Copy',
      'Paste': 'Paste',
      'Edit': 'Edit',
      'Attach file': 'Attach file',
      'Stop Recording': 'Stop Recording',
      'Record Audio': 'Record Audio',
      'Diff': 'Diff',
      'Close diff': 'Close diff',
      'Diff stash (view)': 'Diff stash (view)',
      'Diff restore (edit)': 'Diff restore (edit)',
      'Stash content': 'Stash content',
      'Restore content': 'Restore content',
      'Clear stash': 'Clear stash',
      'Note kind': 'Note kind',
      'Plain note': 'Plain note',
      'Markdown': 'Markdown',
      'Code': 'Code',
      'Raw': 'Raw',
      'Slide': 'Slide',
      'Remove from slides': 'Remove from slides',
      'Add to slides': 'Add to slides',
      'Activate slide': 'Activate slide',
      'Move slide up': 'Move slide up',
      'Move slide down': 'Move slide down',
      'Programming language': 'Programming language',
      '(None)': '(None)',
      'Python': 'Python',
      'JavaScript': 'JavaScript',
      'JSON': 'JSON',
      'HTML': 'HTML',
      'More programming languages': 'More programming languages',
      'Unique name...': 'Unique name...',
      'Waiting for a reply from': 'Waiting for a reply from',
      'The name is not unique': 'The name is not unique',
      'Toggle Loop Exit Operator': 'Toggle Loop Exit Operator',
      'OR': 'OR',
      'AND': 'AND',
      'Set recipient': 'Set recipient',
      'Unset recipient': 'Unset recipient',
      'Set condition': 'Set condition',
      'Unset condition': 'Unset condition',
      'Reorder': 'Reorder',
      'Unlink': 'Unlink'
    },
    Profile: {
      'Error getting user profile.': 'Error getting user profile.',
      'Error': 'Error',
      'Profile': 'Profile',
      'First Name': 'First Name',
      'Last Name': 'Last Name',
      'E-mail address': 'E-mail address',
      'Phone (optionally)': 'Phone (optionally)',
      'Save': 'Save'
    },
    Keys: {
      'Error getting keys.': 'Error getting keys.',
      'Error posting a key.': 'Error posting a key.',
      'Error deleting key.': 'Error deleting key.',
      'Error': 'Error',
      'Info': 'Info',
      'API Keys': 'API Keys',
      'Name': 'Name',
      'Key': 'Key',
      'Created At': 'Created At',
      'Last Used At': 'Last Used At',
      'Actions': 'Actions',
      'Copied': 'Copied',
      'Add Key': 'Add Key',
      'Key Name': 'Key Name',
      'Cancel': 'Cancel',
      'Submit': 'Submit',
      'You can read the': 'You can read the',
      'document to learn more about the Self-developing API.': 'document to learn more about the Self-developing API.',
      'Check the': 'Check the',
      'tool on GitHub to use the Self-developing AI from command line.': 'tool on GitHub to use the Self-developing AI from command line.'
    },
    Vault: {
      'Error getting vault.': 'Error getting vault.',
      'Error posting vault.': 'Error posting vault.',
      'Key is empty': 'Key is empty',
      'The key already exists': 'The key already exists',
      'Error deleting vault.': 'Error deleting vault.',
      'Error': 'Error',
      'Info': 'Info',
      'Vault': 'Vault',
      'Key': 'Key',
      'Value': 'Value',
      'Actions': 'Actions',
      'Expose the secret value': 'Expose the secret value',
      'Copy the secret value': 'Copy the secret value',
      'Delete the key-value secret': 'Delete the key-value secret',
      'Add Key/Value': 'Add Key/Value',
      'Cancel': 'Cancel',
      'Submit': 'Submit',
      'Your keys are safely protected and securely stored.': 'Your keys are safely protected and securely stored.',
      'We use advanced encryption methods...': 'We use advanced encryption methods to ensure that your keys are never exposed in plain text. They are encrypted before storage and kept protected by industry-leading security protocols, so only you and authorized systems have access. Your privacy and security are our top priorities.',
    },
    Subscription: {
      breadcrumb: {
        subscription: "Subscription",
        subscribe: "Subscribe"
      },
      heading: "Subscribe to {{productName}}",
      promotionCode: "Promotion code",
      pricing: "Price: {{currency}} {{amount}} / {{interval}}",
      coupon: "Coupon:",
      couponApplied: 'Coupon {{couponName}} applied.',
      amountDue: "Amount due: {{currency}} {{amount}}",
      form: {
        name: "Full name:",
        paymentMethod: "Payment method:"
      },
      button: {
        apply: "Apply",
        cancel: "Cancel",
        subscribe: "Subscribe"
      },
      emptyPromotionCodeError: "The empty promotion code cannot be applied.",
      applyingPromotionError: "Error applying promotion code",
      subscribingError: "Error subscribing",
      subscriptionCancelingError: "Error canceling subscribing",
      stripeElementsError: "Stripe Elements has not loaded",

      plansHeader: "Subscription Plans",

      plans: {
        free: {
          name: "Explorer (Free)",
          price: "Free",
          title: "Discover & self-host AI. For curious minds and indie tinkerers.",
          description: "For people getting started:",
          values: [
            "3 Maps",
            "Unlimited human contacts",
            "Unlimited groups",
            "Unlimited personal & group chats",
            "Human agents",
            "-",
            "Self-host our open-source software without any limits",
           ],
          button: "Star on GitHub",
        },
        basic: {
          name: "Operator (Basic)",
          price: "USD 6.99 / month",
          title: "Deploy agents. Solve tasks. Use your own API keys.",
          description: "Everything in Free, plus:",
          values: [
            "3 deployed agents (created unlimited)",
            "30 Maps",
            "Basic agents: Chat, RAG, Storage",
            "Model provider: OpenAI (ChatGPT)",
            "-",
            "Use your own LLM API keys (Vault)",
            "Use our LLM API keys (pay-as-you-go)",
          ],
          button: "Get Operator",
        },
        premium: {
          name: "Strategist (Premium)",
          price: "USD 19.99 / month",
          title: "Automate smarter. Design systems. Gain insights.",
          description: "Everything in Basic, plus:",
          values: [
            "10 deployed agents",
            "100 Maps",
            "Voice notes & file attachments on Map",
            "Advanced agents: Speech, TTS, ImageGen",
            "Model providers: OpenAI (ChatGPT), Google GenAI (Gemini)",
            "-",
            "API access + CLI tools",
            "Agent analytics* & logs* (coming soon)",
          ],
          button: "Upgrade to Strategist",
        },
        enterprise: {
          name: "Director (Enterprise)",
          price: "Custom Quote",
          title: "Full-scale orchestration. Private deployments. Enterprise-grade intelligence.",
          description: "Everything in Premium, plus:",
          values: [
            "Unlimited deployed agents",
            "Unlimited Maps",
            "Developer agents: Code, Quantum, Command, Notebook, Langflow, Node-RED, IDE*, Train*, ComputerUse*",
            "Distributed agent network",
            "Social messenger bridges: WhatsApp, Telegram, Slack, Discord, etc.",
            "Phone-line + voice bridge",
            "Synthetic UI (Agentic chat → App generator)",
            "Models Providers: OpenAI, Anthropic, Google VertexAI, Perplexity, Mistral, Cohere, XAI & more.",
            "Ollama-based open-source models: Llama, DeepSeek, Mistral, Sky-T1, etc.",
            "Multimedia agents: Avatar, VideoConf*, VR/AR*, 3dGen**, MusicGen**",
            "Business agents: CRM/ERP*, E-commerce*, SmartContracts*, Bank*",
            "-",
            "Private cloud / on-premise deployments",
          ],
          button: "Contact Sales",
        },


        // NOTE: this is for the test of adding subscription plans
        /**/
        test1: {
          name: "Test1",
          price: "Priceless",
          title: "Just for testing.",
          description: "Nothing is included, plus:",
          values: [
            "Something",
          ],
          button: "Call yourself",
        },
        test2: {
          name: "Test2",
          price: "Pricefull",
          title: "Only for testing.",
          description: "Everything is included, plus:",
          values: [
            "Nothing more than you need",
          ],
          button: "Test it",
        },
        test5: {
          name: "Test5",
          price: "Pricefull",
          title: "Only for testing.",
          description: "Everything is included, plus:",
          values: [
            "Nothing more than you need",
          ],
          button: "Test it",
        },
        /**/

      },

      currentSubscriptions: "Subscriptions",
      status: {
        active: "Active",
        incomplete: "Incomplete",
        incomplete_expired: "Incomplete Expired",
        canceled: "Canceled"
      },
      last4: "Card last 4 digits: {{last4}}",
      createdAt: "Created at: {{created}}",
      canceledAt: ", canceled at: {{canceled}}",
      period: "Current period start: {{start}}, end: {{end}}",
      couponPercent: "Coupon: {{percentOff}}% off",
      couponAmount: "Coupon: {{currency}} {{amountOff}} off",
      forMonths: "for {{months}} months",
      cancelButton: "Cancel",
      cancelHeader: 'Cancel "{{productName}}" Subscription',
      cancelConfirm: "Are you sure you want to cancel your subscription?",
      cancelStop: "Stop",
      cancelYes: "Yes, cancel",

      comparison: {
        header: "Pricing Comparison",
        plans: {
          explorer: "Explorer",
          operator: "Operator",
          strategist: "Strategist",
          director: "Director"
        },
        popularPlan: "strategist",

        ariaLabel: "Subscription plans feature comparison table",
        features: "Features",
        mostPopularLabel: "Most Popular",

        accessLimits: "Pricing",
        price: "Price",
        free: "Free",
        customQuote: "Custom Quote",
        mostPopular: "Most Popular",

        accessAndLimits: "Access & Limits",
        maps: "Maps",
        deployedAgents: "Deployed Agents",
        virtualAgentsCreated: "Virtual Agents (Created)",
        apiCliAccess: "API / CLI Access",
        selfHosting: "Self-hosting (optional)",

        agentTypes: "Agent Archetypes",
        humanAgents: "Human Agents",
        chatRagStorage: "Chat, RAG, Storage Agents",
        speechTtsImageGen: "Speech-to-Text, Text-to-Speech, ImageGen Agents",
        codeQuantumAvatar: "Code, Quantum, Avatar Agents",
        specializedAgents: "Specialized Agents (3dGen, CRM, Blockchain, etc.)",

        modelProviders: "Model Providers",
        openAIChatGPT: "OpenAI (ChatGPT)",
        googleGenAI: "Google GenAI (Gemini)",
        extendedProviders: "Extended Providers (Anthropic, Cohere, Ollama, etc.)",

        integrationsDeployment: "Integrations & Deployment",
        useYourLlmKeys: "Use Your LLM API Keys",
        useOurLlmKeys: "Use Our LLM API Keys (pay-as-you-go)",
        distributedSystems: "Distributed Systems & Orchestration",
        privateCloud: "Private Cloud / On-Prem Deployment",
        socialPhoneIntegration: "Social Messenger & Phone-line Integration",
        unlimited: "Unlimited",

        common: {
          included: "Included",
          notIncluded: "Not included"
        },
      },
    },
    Settings: {
      settings: 'Settings',
      language: 'Language',
      save: 'Save',
      error: 'Error',
    },
    Team: {
      sectionTitle: "Team",
      sectionSubtitle: "A diverse leadership team with deep expertise across business, technology, and psychology.",

      artemName: "Artem Arakcheev, PhD, DBA",
      artemRole: "Founder, CTO",
      artemDescription:
        "Artem Arakcheev drives innovation as a technology leader and entrepreneur, specializing in AI, quantum computing, and SaaS/PaaS startups. He architects cutting-edge solutions, excelling in smart contracts, cloud, and full-stack development.",

      kateName: "Kate Melnikova",
      kateRole: "HR Director",
      kateDescription:
        "Kate Melnikova leads with empathy and vision, bringing together expertise in psychology, human capital strategy, and art direction. She cultivates a strong team culture and actively represents the company at industry events, building meaningful connections.",
    },
    Mission: {
      missionTitle: "Mission Statement",
      missionText: "At <1>{{appName}}</1>, our mission is to empower humanity by providing an autonomous agentic platform that operates businesses 24/7, generating revenue and granting more time to human owners for strategic decision-making.",

      visionTitle: "Visionary Foundations",
      visionParagraph1: "Envision a future where intelligent agentic teams drive business forward — teams that are <1>self-developing</1>, <3>self-selling</3>, and <5>self-finding</5>.",
      visionParagraph2: "Built on these three foundational pillars, our platform empowers agentic AI to collaborate on every aspect of business development — from discovering and funding startups to marketing, sales, research, development, and administration. These teams work alongside humans, learning from human creativity, behavior, and strategy — with the ultimate goal of autonomously evolving to handle the full spectrum of business operations.",
    },
    Mobile: {
      title: "Mobile Apps",
      optionsTitle: "Options",
      optionsIntro: "There are 2 options for mobile apps available:",
      optionNative: "Native iOS and Android apps.",
      optionWeb: "Mobile web app.",

      nativeTitle: "Native Mobile Apps",
      nativeSubheader: "Install via Expo",
      nativeIntro: "You can experience our mobile app instantly using <1>Expo Go</1>. First, download the Expo Go app from the app store:",
      getExpoGo: "Get Expo Go",
      scanQr: "Then scan the QR code below to open our app in Expo:",
      runtimeVersion: "Runtime Version",
      published: "Published",
      qrAlt: "Install via link",
      nativeFallback: "If you cannot scan the QR code, click the button:",
      installNative: "Install Native Mobile App",

      webTitle: "Mobile Web App",
      webSubheader: "Open a Link",
      webIntro: "You can also use our fully responsive mobile web app, accessible directly in your browser:",
      openWebApp: "Open Mobile Web App",
    },
    Security: {
      title: "Security at {{appName}}",
      intro: "At <1>{{appName}}</1>, the security and privacy of our platform, our users, and your data are our highest priorities. We are committed to building agentic AI systems that are not only powerful and autonomous, but also safe and resilient.",

      disclosureTitle: "Responsible Disclosure",
      disclosureText: "We deeply appreciate researchers, developers, and users who help us keep {{appName}} secure. If you discover a vulnerability, we encourage responsible disclosure.",
      emailUs: "Email us",

      disclosureDetailsTitle: "Please include, if possible:",
      disclosureList: {
        step: "Steps to reproduce the issue or a working proof-of-concept (PoC).",
        tools: "Any tools or libraries used, including version numbers.",
        output: "Tool output or logs related to the vulnerability."
      },

      commitmentTitle: "Commitment to Security",
      commitmentList: {
        sdlc: "Secure software development lifecycle (SSDLC).",
        scanning: "Regular dependency scanning and patching.",
        pentesting: "Penetration testing and third-party security audits.",
        leastPrivilege: "Principle of least privilege across infrastructure.",
        encryption: "Encryption at rest and in transit."
      },

      openSourceTitle: "Open Source Security",
      openSourceText: "For vulnerabilities in our open-source components, please refer to our GitHub repositories. Many have <1>SECURITY.md</1> files with further guidance.",
      visitGitHub: "Visit GitHub",
      readSecurityMd: "Read SECURITY.md",

      contactTitle: "Contact",
      contactText: "Have questions or concerns about security at {{appName}}? Reach out at <1>{{email}}</1>.",
    },
    Pricing: {
      journeyTitle: "From zero to IPO",
      journeyText: "Designed for every stage of your journey. Start today, no credit card required.",

      pricingTitle: "Pricing",
      comparisonTitle: "Pricing Comparison",
    },
  },
  'ru-RU': {
    translation: {
    },
    app: {
      'name': 'ГиперАгентство',
    },
    Home: {
      'Open-source Agentic AI': 'Агентный ИИ с открытым исходным кодом',
      'Supercharges Entrepreneurial Dreams': 'Ускоряет предпринимательские мечты',
      'Autopilot your business. Focus on what you love.': 'Переведите бизнес на автопилот. Займитесь тем, что любите.',
      'Powered by Self-developing': 'Работает на Self-developing',
      'Start for free': 'Начать бесплатно',
      'Join a waitlist': 'Присоединиться к листу ожидания',
      'Star on GitHub': 'Отметить звёздочкой на GitHub',
      'Your Toolkit for Building an Autonomous Business': 'Ваш набор инструментов для создания автономного бизнеса',
      'Map': 'Карта',
      'Hive': 'Улей',
      'Chat': 'Чат',
      'Many More': 'И многое другое',
      'The Visual Command Center for Agentic Collaboration. Visually orchestrate agents and human resources, design complex workflows, connect prompts, control execution, and create compelling presentations—all within a user-friendly, no-code/low-code environment.': 'Визуальный командный центр для агентного взаимодействия. Управляйте агентами и людьми, проектируйте сложные рабочие процессы, соединяйте подсказки, контролируйте выполнение и создавайте презентации — всё это в удобной среде без кода или с минимальным кодом.',
      'LLM Power': 'Мощь языковых моделей',
      'Chat, RAG (train on your data), Speech-to-text, Text-to-speech': 'Чат, RAG (обучение на ваших данных), распознавание речи, синтез речи',
      'Creative & Visual': 'Творчество и визуализация',
      'ImageGen, Avatar': 'Генерация изображений, Аватары',
      'Technical Prowess:': 'Техническое мастерство:',
      'Code, Quantum, Storage, Command': 'Код, Квант, Хранилище, Команды',
      'Workflow Integration:': 'Интеграция с рабочими процессами:',
      'LangFlow, Node-RED, Notebook': 'LangFlow, Node-RED, Блокнот',
      'Seamlessly communicate with agents, humans, and mixed teams in private channels and group discussions.': 'Бесшовно общайтесь с агентами, людьми и смешанными командами в приватных каналах и группах.',
      'API & CLI:': 'API и CLI:',
      'Access platform features programmatically for advanced customization and seamless integration.': 'Используйте возможности платформы программно для гибкой настройки и интеграции.',
      'Mobile & Desktop Apps': 'Мобильные и десктопные приложения',
      'Stay connected and manage your agents on the go with our iOS, Android, macOS, Linux, and Windows apps.': 'Оставайтесь на связи и управляйте агентами в дороге с помощью приложений для iOS, Android, macOS, Linux и Windows.',
      'Docs': 'Доки',
      'Comprehensive documentation and tutorials to guide you from setup to advanced agentic strategies.': 'Подробная документация и учебные материалы — от настройки до продвинутых агентных стратегий.',
      'Imagine a World Where Your Business Runs Itself': 'Представьте мир, где ваш бизнес работает сам',
      'Tired of being bogged down in repetitive tasks?': 'Устали от рутинных задач?',
      'Dreaming of scaling your business without the endless grind?': 'Мечтаете масштабировать бизнес без бесконечной рутины?',
      'makes it possible.': 'делает это возможным.',
      'We are building a future where intelligent AI agents work alongside you, automating the mundane, amplifying your creativity, and unlocking unprecedented growth.': 'Мы создаем будущее, где умные ИИ-агенты работают с вами: автоматизируют рутину, усиливают креативность и открывают путь к росту без ограничений.',


      virtualStartupTeamsTitle: "Виртуальные стартап-команды",
      virtualStartupTeamsDesc: "Ощутите беспрецедентный рост с виртуальными командами, созданными для автоматизации рабочих процессов и снижения затрат.",

      reclaimYourTimeTitle: "Верните себе время",
      reclaimYourTimeDesc: "Делегируйте утомительные задачи неутомимым ИИ-агентам, чтобы сосредоточиться на стратегии и ключевых решениях.",

      scaleEffortlesslyTitle: "Масштабируйтесь без усилий",
      scaleEffortlesslyDesc: "Расширяйте возможности бизнеса без ограничений традиционного найма. Формируйте виртуальные команды, работающие 24/7.",

      reduceCostsTitle: "Снижайте издержки и повышайте эффективность",
      reduceCostsDesc: "Оптимизируйте процессы и устраняйте неэффективность с помощью интеллектуальной автоматизации, улучшая финансовые показатели.",

      unlockInsightsTitle: "Откройте доступ к аналитике на основе данных",
      unlockInsightsDesc: "Используйте аналитику на базе ИИ, чтобы лучше понять бизнес и принимать более умные, обоснованные решения.",

      buildDreamBusinessTitle: "Создайте бизнес своей мечты",
      buildDreamBusinessDesc: "Занимайтесь любимым делом, зная, что {{appName}} всегда работает в фоновом режиме, поддерживая вашу идею.",


      aiDreamTeamTitle: "Познакомьтесь с вашей командой мечты: Архетипы агентов для любых задач",

      archetypeChat: "Чат",
      archetypeRAG: "RAG",
      archetypeSpeech: "Речь <-> Текст",
      archetypeImageGen: "Генерация изображений",
      archetypeCode: "Код",
      archetypeOthers: "И многое другое",

      archetypeChatDesc: "Взаимодействуйте с передовыми LLM от OpenAI, Anthropic, Google и других.",
      archetypeRAGDesc: "Обучайте LLM на ваших данных для создания специализированных баз знаний.",
      archetypeSpeechDesc: "Создавайте голосовые рабочие процессы и обеспечивайте доступность.",
      archetypeImageGenDesc: "Создавайте потрясающие визуалы с помощью Dalle-2 и Dalle-3.",
      archetypeCodeDesc: "Автоматизируйте сложные программные задачи и ускоряйте разработку.",
      archetypeOthersDesc: "Квант, Хранилище, Команды, Langflow, Node-RED, Блокнот, Аватар.",


      scaleWithSecurityTitle: "Масштабируйтесь с безопасностью",
      scaleWithSecurityDesc: "Безопасно храните свои API-ключи и учётные данные в <strong>Хранилище</strong> с надёжным шифрованием, гарантируя защиту ваших данных и интеграций.",


      startBuildingTitle: "Начните строить своё автономное будущее уже сегодня — это бесплатно!",

      openSourceTitle: "Открытый исходный код",
      openSourceDesc: "Развёртывайте платформу самостоятельно и запускайте неограниченное количество агентов бесплатно.",

      freeTierTitle: "Бесплатный тариф",
      freeTierDesc: "Запускайте до 3 агентов одновременно на нашей облачной платформе.",

      cloudDeploymentTitle: "Облачное развёртывание",
      cloudDeploymentDesc: "Простое размещение и управление вашей платформой {{appName}}.",

      starOnGithub: "Отметить на GitHub",
      startForFree: "Начать бесплатно",
      joinWaitlist: "Присоединиться к листу ожидания",


      unlockPremiumTitle: "Откройте полный потенциал с нашим премиальным облачным решением",

      syntheticUITitle: "Синтетический интерфейс",
      syntheticUIDesc: "Динамически создаваемые и программно управляемые пользовательские интерфейсы.",

      distributedSystemTitle: "Распределённая система",
      distributedSystemDesc: "Связывайте людей и агентов через серверные сети.",

      socialBridgeTitle: "Социальный мост",
      socialBridgeDesc: "Интегрируйте агентов с социальными сетями и мессенджерами.",

      phoneIntegrationTitle: "Интеграция с телефонией",
      phoneIntegrationDesc: "Общайтесь с агентами через звонки и сообщения.",

      seePlans: "Посмотреть планы",


      futureTitle: "Будущее {{appName}}: взгляд в завтра",

      collaborationTitle: "Сотрудничество и коммуникация",
      collaborationDesc: "Meet (видеоконференции) — бесшовное общение с агентами и людьми.",

      workflowTitle: "Автоматизация рабочих процессов",
      workflowDesc: "Flow, Node — визуальное проектирование и автоматизация сложных процессов.",

      aiTrainingTitle: "Обучение и развитие ИИ",
      aiTrainingDesc: "Train, Note, Code — наделяйте агентов непрерывным обучением.",

      businessAppsTitle: "Бизнес-приложения",
      businessAppsDesc: "Sell (CRM/ERP), E-commerce, Storefront, Bank — оптимизация ключевых бизнес-функций.",

      emergingTechTitle: "Перспективные технологии",
      emergingTechDesc: "Интеграции с блокчейном, смарт-контрактами, VR/AR.",


      trailblazerTitle: "Станьте первопроходцем в инновациях агентного ИИ!",
      trailblazerDesc: "{{appName}} — это не просто платформа; это живое сообщество новаторов, предпринимателей и разработчиков, создающих будущее труда. Общайтесь с единомышленниками, делитесь идеями и вносите вклад в развитие агентного ИИ.",

      joinCommunity: "Присоединиться к сообществу",
      viewDocs: "Посмотреть документацию",
      contactUs: "Связаться с нами",


      reviewers: {
        AlexanderPavlov: {
          name: "Александр Павлов",
          content: "Классный проект. Будущее принадлежит таким технологиям. Задачи решаются вовремя."
        },
        KateMelnikova: {
          name: "Екатерина Мельникова",
          content: "Платформа позволяет предпринимателям значительно сократить время, затрачиваемое на решение текущих бизнес-задач. А главное — использовать новые технологии с HiperAgency легко и не требует длительного изучения вопроса. Даже с нуля знаний и представлений о пользе ИИ в бизнесе, можно начать пользоваться платформой и программировать на понятном языке. Здорово превращаться из индивидуального предпринимателя в разработчика под нужды своего бизнеса, уменьшая время на объяснение задач подрядчикам. Необходимый минимум можно сделать самому с помощью этой замечательной платформы."
        },
        DmitriyArakcheev: {
          name: "Дмитрий Аракчеев",
          content: "Лучшая многофункциональная платформа, которую я видел. Особенно нравится структура, когда можно собрать много агентов, выполняющих процессы между собой."
        },
        AlekseyArakcheev: {
          name: "Алексей Аракчеев",
          content: "Помогло решить задачи."
        },
        AslanAtemov: {
          name: "Аслан Атемов",
          content: "Сервис удобный и простой в использовании. Всё отлично работает!"
        },
        JonathanSimons: {
          name: "Jonathan Simons",
          content: "Обожаю этих агентов."
        },
        AlexanderLabyrich: {
          name: "Александр Лабырич",
          content: "Пробовал эту систему в действии. Очень удобный интерфейс, который позволяет создавать разные варианты выполнения запроса. Много возможностей при простоте использования!"
        },
        AnnaAgeeva: {
          name: "Анна Агеева",
          content: "Мощное приложение. Функциональность потрясающая — можно смоделировать любое событие, игру, дебаты, переговоры... всё ограничено только воображением!"
        }
      },
      empoweringTitle: "Даем силы новому поколению предпринимателей."
    },
    ResponsiveContainer: {
      'Docs': 'Доки',
      'Mobile': 'Мобильное',
      'Pricing': 'Цены',
      'Log In': 'Войти',
      'Sign Up': 'Зарегистрироваться',
      'Join a Waitlist': 'Присоединиться к списку ожидания',
      'Mobile App': 'Мобильное приложение',
      'Get Started': 'Начать',
      'Documentation': 'Документация',
      'GitHub': 'GitHub',
      'YouTube': 'YouTube',
      'Contact Us': 'Связаться с нами',
      'Close Sidebar': 'Закрыть боковую панель'
    },
    Footer: {
      'Contact Us': 'Связаться с нами',
      'GitHub': 'GitHub',
      'LinkedIn': 'LinkedIn',
      'Discord': 'Discord',
      'YouTube': 'YouTube',
      'X': 'X',
      'Platform': 'Платформа',
      'Home': 'Главная',
      'Documentation': 'Документация',
      'Pricing': 'Цены',
      'Security': 'Безопасность',
      'Mobile apps': 'Мобильные приложения',
      'About Us': 'О нас',
      'slogan': `Саморазвивающийся ${conf.app.name} адаптируется под потребности вашего бизнеса.`,
      'Team': 'Команда',
      'Mission': 'Миссия',
      'Roadmap': 'Дорожная карта',
      'Select language': 'Выбрать язык',
      'Share': 'Поделиться',
      'QR Code': 'QR-код для главной страницы',
      'Tap QR': 'Нажмите на QR для полного экрана.',
      'copyright': `© 2024–2025 ${conf.app.company}. Все права защищены.`,
      'Terms of Service': 'Условия использования',
      'Privacy Policy': 'Политика конфиденциальности',
      'LLMs': 'Языковые модели',
    },
    Login: {
      'Please enter a valid email address': 'Пожалуйста, введите корректный адрес электронной почты',
      'Please enter a valid password': 'Пожалуйста, введите корректный пароль',
      'Error logging in.': 'Ошибка входа.',
      'Log-in to Your Account': 'Вход в ваш аккаунт',
      'E-mail address': 'Адрес электронной почты',
      'Password': 'Пароль',
      'Remember Me': 'Запомнить меня',
      'Login': 'Войти',
      'Forgot password?': 'Забыли пароль?',
      'New to us?': 'Впервые у нас?',
      'Sign Up': 'Зарегистрироваться'
    },
    Signup: {
      'The password should satisfy the following criteria': 'Пароль должен соответствовать следующим требованиям',
      'At least one upper case English letter.': 'Как минимум одна заглавная английская буква.',
      'At least one lower case English letter.': 'Как минимум одна строчная английская буква.',
      'At least one digit.': 'Как минимум одна цифра.',
      'At least one special character.': 'Как минимум один специальный символ.',
      'Minimum length is 8 characters.': 'Минимальная длина — 8 символов.',
      'Passwords match.': 'Пароли совпадают.',
      'Please enter a valid first name': 'Пожалуйста, введите корректное имя',
      'Please enter a valid last name': 'Пожалуйста, введите корректную фамилию',
      'Please enter a valid email address': 'Пожалуйста, введите корректный адрес электронной почты',
      'Please enter a valid phone': 'Пожалуйста, введите корректный номер телефона',
      'Please enter a valid password': 'Пожалуйста, введите корректный пароль',
      'Please enter passwords that match': 'Пожалуйста, введите совпадающие пароли',
      'Error registering a user account.': 'Ошибка при регистрации аккаунта.',
      'Create a New Account': 'Создать новый аккаунт',
      'Error': 'Ошибка',
      'First Name': 'Имя',
      'Last Name': 'Фамилия',
      'E-mail address': 'Адрес электронной почты',
      'Phone (optionally)': 'Телефон (необязательно)',
      'Password': 'Пароль',
      'Repeat Password': 'Повторите пароль',
      'I have read and agree to the': 'Я прочитал(а) и согласен(на) с',
      'terms of service': 'условиями обслуживания',
      'and': 'и',
      'privacy policy': 'политикой конфиденциальности',
      'Sign Up': 'Зарегистрироваться',
      'Have an existing account?': 'У вас уже есть аккаунт?',
      'Log In': 'Войти',
    },
    Forgot: {
      'Please enter a valid email address': 'Пожалуйста, введите корректный адрес электронной почты',
      'Error sending a reset link.': 'Ошибка при отправке ссылки для сброса пароля.',
      'Forgot Password?': 'Забыли пароль?',
      'Error': 'Ошибка',
      'Info': 'Информация',
      'E-mail address': 'Адрес электронной почты',
      'Email Me Reset Password Link': 'Отправить ссылку для сброса пароля на почту',
      'Remember password?': 'Помните пароль?',
      'Log In': 'Войти'
    },
    Reset: {
      'Please enter a valid password': 'Пожалуйста, введите корректный пароль',
      'Please enter passwords that match': 'Пожалуйста, введите совпадающие пароли',
      'Error resetting a password.': 'Ошибка при сбросе пароля.',
      'Reset Password': 'Сбросить пароль',
      'Error': 'Ошибка',
      'New Password': 'Новый пароль',
      'Repeat Password': 'Повторите пароль',
      'Reset password': 'Сбросить пароль',
      'Remember password?': 'Помните пароль?',
      'Log In': 'Войти'
    },
    Menubar: {
      'Hive': 'Улей',
      'Chat': 'Чат',
      'Talk': 'Разговор',
      'Map': 'Карта',
      'Meet': 'Встреча',
      'Flow': 'Поток',
      'Node': 'Узел',
      'Code': 'Код',
      'Note': 'Заметка',
      'Sell': 'Продажа',
      'Train': 'Обучение',
      'Docs': 'Документация',
      'Profile': 'Профиль',
      'API Keys': 'API-ключи',
      'Vault': 'Сейф',
      'Subscription': 'Подписка',
      'Settings': 'Настройки',
      'Log Out': 'Выйти'
    },
    Chat: {
    },
    Hive: {
      'Error retrieving credentials.': 'Ошибка при получении учетных данных.',
      'Error getting agents.': 'Ошибка при получении агентов.',
      'Error posting agent.': 'Ошибка при добавлении агента.',
      'Error putting agent.': 'Ошибка при обновлении агента.',
      'Error deleting agent.': 'Ошибка при удалении агента.',
      'Error downloading agents.': 'Ошибка при загрузке агентов.',
      'Invalid JSON file': 'Недопустимый JSON-файл',
      'Please upload a valid JSON file.': 'Пожалуйста, загрузите допустимый JSON-файл.',
      'Error uploading map.': 'Ошибка при загрузке карты.',
      'Error': 'Ошибка',
      'Info': 'Информация',
      'Schema Validation Error': 'Ошибка проверки схемы',
      'Add Agent': 'Добавить агента',
      'Download': 'Скачать',
      'Upload': 'Загрузить',
      'Archetype': 'Архетип',
      'Options': 'Параметры',
      'Select Archetype': 'Выбрать архетип',
      'Not compliant with JSON Schema': 'Не соответствует схеме JSON',
      'JSON Schema error': 'Ошибка схемы JSON',
      'Cancel': 'Отмена',
      'Submit': 'Отправить',
      'Edit': 'Редактировать',
      'Delete': 'Удалить',
      '(no description)': '(без описания)',
      'Deployed': 'Развернуто',
      'Update': 'Обновить'
    },
    Map: {
      'Error getting maps.': 'Ошибка при получении карт.',
      'Error posting map.': 'Ошибка при добавлении карты.',
      'Error putting map.': 'Ошибка при обновлении карты.',
      'Error deleting map.': 'Ошибка при удалении карты.',
      'Error downloading map.': 'Ошибка при загрузке карты.',
      'Invalid JSON file.': 'Недопустимый JSON-файл.',
      'Please upload a valid JSON file.': 'Пожалуйста, загрузите допустимый JSON-файл.',
      'Error uploading map.': 'Ошибка при загрузке карты.',
      'Error retrieving credentials.': 'Ошибка при получении учетных данных.',
      'Please select recipient': 'Пожалуйста, выберите получателя',
      'Show the Map menu': 'Показать меню карты',
      'Hide the Map menu': 'Скрыть меню карты',
      'File': 'Файл',
      'New': 'Создать',
      'Save': 'Сохранить',
      'Duplicate': 'Дублировать',
      'Rename': 'Переименовать',
      'Disable autosave': 'Отключить автосохранение',
      'Enable autosave': 'Включить автосохранение',
      'Autosave': 'Автосохранение',
      'Download': 'Скачать',
      'Upload': 'Загрузить',
      'Confirm Map Delete': 'Подтвердите удаление карты',
      'Are you sure you want to delete your map?': 'Вы уверены, что хотите удалить карту?',
      'Delete': 'Удалить',
      'View': 'Вид',
      'Show menu': 'Показать меню',
      'Show opener': 'Показать открыватель',
      'Show file controls': 'Показать управление файлами',
      'Show layout controls': 'Показать управление макетом',
      'Show color controls': 'Показать управление цветом',
      'Show execution controls': 'Показать элементы управления выполнением',
      'Show slide controls': 'Показать управление слайдами',
      'Show slides deck sidebar': 'Показать боковую панель слайдов',
      'Show mini map': 'Показать мини-карту',
      'Show control panel': 'Показать панель управления',
      'Settings': 'Настройки',
      'Code viewer theme': 'Тема просмотра кода',
      'Code editor theme': 'Тема редактора кода',
      'Code editor mode': 'Режим редактора кода',
      'Normal': 'Обычный',
      'Vim': 'Vim',
      'Markdown editor options': 'Настройки редактора Markdown',
      'Markdown editor (light)': 'Редактор Markdown (светлый)',
      'Markdown editor (dark)': 'Редактор Markdown (тёмный)',
      'Code editor': 'Редактор кода',
      'Code editor with preview': 'Редактор кода с предпросмотром',
      'Cancel': 'Отмена',
      'Create a new map': 'Создать новую карту',
      'Save the map': 'Сохранить карту',
      'Duplicate the map': 'Дублировать карту',
      'Delete the map': 'Удалить карту',
      'Download the map': 'Скачать карту',
      'Upload the map': 'Загрузить карту',
      'Rename the map': 'Переименовать карту',
      'Title...': 'Заголовок...',
      'Select a map to open': 'Выберите карту для открытия',
      'Top-to-bottom layout': 'Макет сверху вниз',
      'Left-to-right layout': 'Макет слева направо',
      'Apply text color to selected notes': 'Применить цвет текста к выбранным заметкам',
      'Select text color': 'Выбрать цвет текста',
      'Apply background color to selected notes': 'Применить цвет фона к выбранным заметкам',
      'Select background color': 'Выбрать цвет фона',
      'Apply edge color to selected notes': 'Применить цвет границы к выбранным заметкам',
      'Select edge color': 'Выбрать цвет границы',
      'Select text, background and edge colors by default': 'Выбирать текст, фон и цвет границы по умолчанию',
      'Reorder edges': 'Изменить порядок связей',
      'Resume running the map': 'Возобновить выполнение карты',
      'Pause running the map': 'Приостановить выполнение карты',
      'Run the map': 'Запустить карту',
      'Step forward': 'Шаг вперед',
      'Stop running the map': 'Остановить выполнение карты',
      'Show slide deck sidebar': 'Показать боковую панель слайдов',
      'Hide slide deck sidebar': 'Скрыть боковую панель слайдов',
      'Previous slide': 'Предыдущий слайд',
      'Next slide': 'Следующий слайд',
      'Select recipient': 'Выбрать получателя',
      'Recipient': 'Получатель',
      '/RegExp/ Condition...': '/RegExp/ Условие...',
      'Add Note': 'Добавить заметку',
      'Loop Selected': 'Зациклить выбранное',
      'Apply': 'Применить',
      'Microphone access denied or not available.': 'Доступ к микрофону запрещен или недоступен.',
      'Copy': 'Копировать',
      'Paste': 'Вставить',
      'Edit': 'Редактировать',
      'Attach file': 'Прикрепить файл',
      'Stop Recording': 'Остановить запись',
      'Record Audio': 'Записать аудио',
      'Diff': 'Различия',
      'Close diff': 'Закрыть различия',
      'Diff stash (view)': 'Различия (просмотр)',
      'Diff restore (edit)': 'Восстановление различий (редактирование)',
      'Stash content': 'Сохранить содержимое',
      'Restore content': 'Восстановить содержимое',
      'Clear stash': 'Очистить временное хранилище',
      'Note kind': 'Тип заметки',
      'Plain note': 'Обычная заметка',
      'Markdown': 'Markdown',
      'Code': 'Код',
      'Raw': 'Исходный',
      'Slide': 'Слайд',
      'Remove from slides': 'Удалить из слайдов',
      'Add to slides': 'Добавить в слайды',
      'Activate slide': 'Активировать слайд',
      'Move slide up': 'Переместить слайд вверх',
      'Move slide down': 'Переместить слайд вниз',
      'Programming language': 'Язык программирования',
      '(None)': '(Нет)',
      'Python': 'Python',
      'JavaScript': 'JavaScript',
      'JSON': 'JSON',
      'HTML': 'HTML',
      'More programming languages': 'Больше языков программирования',
      'Unique name...': 'Уникальное имя...',
      'Waiting for a reply from': 'Ожидание ответа от',
      'The name is not unique': 'Имя не уникально',
      'Toggle Loop Exit Operator': 'Переключить оператор выхода из цикла',
      'OR': 'ИЛИ',
      'AND': 'И',
      'Set recipient': 'Назначить получателя',
      'Unset recipient': 'Снять получателя',
      'Set condition': 'Установить условие',
      'Unset condition': 'Удалить условие',
      'Reorder': 'Изменить порядок',
      'Unlink': 'Отсоединить'
    },
    Profile: {
      'Error getting user profile.': 'Ошибка при получении профиля пользователя.',
      'Error': 'Ошибка',
      'Profile': 'Профиль',
      'First Name': 'Имя',
      'Last Name': 'Фамилия',
      'E-mail address': 'Адрес электронной почты',
      'Phone (optionally)': 'Телефон (необязательно)',
      'Save': 'Сохранить'
    },
    Keys: {
      'Error getting keys.': 'Ошибка при получении ключей.',
      'Error posting a key.': 'Ошибка при добавлении ключа.',
      'Error deleting key.': 'Ошибка при удалении ключа.',
      'Error': 'Ошибка',
      'Info': 'Информация',
      'API Keys': 'API-ключи',
      'Name': 'Название',
      'Key': 'Ключ',
      'Created At': 'Создан',
      'Last Used At': 'Последнее использование',
      'Actions': 'Действия',
      'Copied': 'Скопировано',
      'Add Key': 'Добавить ключ',
      'Key Name': 'Название ключа',
      'Cancel': 'Отмена',
      'Submit': 'Отправить',
      'You can read the': 'Вы можете прочитать',
      'document to learn more about the Self-developing API.': 'документ, чтобы узнать больше о Self-developing API.',
      'Check the': 'Посмотрите',
      'tool on GitHub to use the Self-developing AI from command line.': 'инструмент на GitHub, чтобы использовать Self-developing AI через командную строку.'
    },
    Vault: {
      'Error getting vault.': 'Ошибка при получении хранилища.',
      'Error posting vault.': 'Ошибка при добавлении в хранилище.',
      'Key is empty': 'Ключ пустой',
      'The key already exists': 'Ключ уже существует',
      'Error deleting vault.': 'Ошибка при удалении из хранилища.',
      'Error': 'Ошибка',
      'Info': 'Информация',
      'Vault': 'Сейф',
      'Key': 'Ключ',
      'Value': 'Значение',
      'Actions': 'Действия',
      'Expose the secret value': 'Показать секретное значение',
      'Copy the secret value': 'Скопировать секретное значение',
      'Delete the key-value secret': 'Удалить пару ключ/значение',
      'Add Key/Value': 'Добавить ключ/значение',
      'Cancel': 'Отмена',
      'Submit': 'Отправить',
      'Your keys are safely protected and securely stored.': 'Ваши ключи надежно защищены и безопасно хранятся.',
      'We use advanced encryption methods...': 'Мы используем передовые методы шифрования, чтобы гарантировать, что ваши ключи никогда не будут храниться в открытом виде. Они шифруются перед сохранением и защищаются с помощью лучших отраслевых протоколов безопасности, поэтому доступ имеют только вы и авторизованные системы. Ваша конфиденциальность и безопасность — наш главный приоритет.',
    },
    Subscription: {
      breadcrumb: {
        subscription: "Подписка",
        subscribe: "Оформить"
      },
      heading: "Подписка на {{productName}}",
      promotionCode: "Промокод",
      pricing: "Цена: {{currency}} {{amount}} / {{interval}}",
      coupon: "Купон:",
      couponApplied: "Промокод {{couponName}} применён.",
      amountDue: "К оплате: {{currency}} {{amount}}",
      form: {
        name: "Полное имя:",
        paymentMethod: "Способ оплаты:"
      },
      button: {
        apply: "Применить",
        cancel: "Отмена",
        subscribe: "Подписаться"
      },
      emptyPromotionCodeError: "Промокод не может быть пустым",
      applyingPromotionError: "Ошибка при применении промокода",
      subscribingError: "Ошибка при оформлении подписки",
      subscriptionCancelingError: "Ошибка при отмене подписки",
      stripeElementsError: "Stripe Elements не загружены",

      plansHeader: "Тарифные планы",

      plans: {
        free: {
          name: "Исследователь (Бесплатно)",
          price: "Бесплатно",
          title: "Исследуйте и размещайте ИИ самостоятельно. Для любознательных и энтузиастов.",
          description: "Для начинающих:",
          values: [
            "3 карты",
            "Неограниченное количество человеческих контактов",
            "Неограниченное количество групп",
            "Неограниченные личные и групповые чаты",
            "Агенты-люди",
            "-",
            "Самостоятельный хостинг нашего программного обеспечения с открытым исходным кодом без любых ограничений",
          ],
          button: "Поставить звезду на GitHub",
        },
        basic: {
          name: "Оператор (Базовый)",
          price: "USD 6.99 / месяц",
          title: "Развёртывайте агентов. Решайте задачи. Используйте свои API-ключи.",
          description: "Всё из Бесплатного тарифа, плюс:",
          values: [
            "3 активных агента (неограниченное создание)",
            "30 карт",
            "Базовые агенты: Чат, RAG, Хранилище",
            "Провайдер модели: OpenAI (ChatGPT)",
            "-",
            "Использование собственных API-ключей LLM (через Vault)",
            "Использование наших API-ключей LLM (оплата по мере использования)",
          ],
          button: "Получить Оператора",
        },
        premium: {
          name: "Стратег (Премиум)",
          price: "USD 19.99 / месяц",
          title: "Автоматизируйте умнее. Проектируйте системы. Получайте инсайты.",
          description: "Всё из Базового тарифа, плюс:",
          values: [
            "10 активных агентов",
            "100 карт",
            "Голосовые заметки и вложения файлов на карте",
            "Продвинутые агенты: Речь, TTS, Генерация изображений",
            "Провайдеры моделей: OpenAI (ChatGPT), Google GenAI (Gemini)",
            "-",
            "Доступ к API и CLI-инструментам",
            "Аналитика агентов* и логи* (скоро)",
          ],
          button: "Обновиться до Стратега",
        },
        enterprise: {
          name: "Директор (Корпоративный)",
          price: "Индивидуальный расчёт",
          title: "Полная оркестрация. Приватное развёртывание. Интеллект на уровне предприятия.",
          description: "Всё из Премиум-тарифа, плюс:",
          values: [
            "Неограниченное количество активных агентов",
            "Неограниченное количество карт",
            "Агенты для разработчиков: Код, Квант, Команды, Блокнот, Langflow, Node-RED, IDE*, Обучение*, Использование ПК*",
            "Распределённая сеть агентов",
            "Интеграции с мессенджерами: WhatsApp, Telegram, Slack, Discord и др.",
            "Интеграция с телефонной связью и голосом",
            "Синтетический интерфейс (агент → генератор приложений)",
            "Провайдеры моделей: OpenAI, Anthropic, Google VertexAI, Perplexity, Mistral, Cohere, XAI и др.",
            "Open-source модели на базе Ollama: Llama, DeepSeek, Mistral, Sky-T1 и др.",
            "Мультимедийные агенты: Аватар, Видеоконференции*, VR/AR*, 3dGen**, MusicGen**",
            "Бизнес-агенты: CRM/ERP*, E-commerce*, SmartContracts*, Банк*",
            "-",
            "Приватное облако / локальное развёртывание",
          ],
          button: "Связаться с продажниками",
        },
      },

      currentSubscriptions: "Подписки",
      status: {
        active: "Активна",
        incomplete: "Незавершённая",
        incomplete_expired: "Незавершённая истекла",
        canceled: "Отменена"
      },
      last4: "Последние 4 цифры карты: {{last4}}",
      createdAt: "Создана: {{created}}",
      canceledAt: ", отменена: {{canceled}}",
      period: "Текущий период: с {{start}} по {{end}}",
      couponPercent: "Купон: {{percentOff}}%",
      couponAmount: "Купон: {{currency}} {{amountOff}}",
      forMonths: "на {{months}} мес.",
      cancelButton: "Отменить",
      cancelHeader: 'Отмена подписки "{{productName}}"',
      cancelConfirm: "Вы уверены, что хотите отменить подписку?",
      cancelStop: "Прекратить",
      cancelYes: "Да, отменить",

      comparison: {
        header: "Сравнение тарифов",
        plans: {
          explorer: "Исследователь",
          operator: "Оператор",
          strategist: "Стратег",
          director: "Директор"
        },
        popularPlan: "strategist",

        ariaLabel: "Таблица сравнения функций подписок",
        features: "Функции",
        mostPopularLabel: "Самый популярный",

        accessLimits: "Цена и ограничения",
        price: "Цена",
        free: "Бесплатно",
        customQuote: "Индивидуальный расчёт",
        mostPopular: "Самый популярный",

        accessAndLimits: "Доступ и лимиты",
        maps: "Карты",
        deployedAgents: "Активные агенты",
        virtualAgentsCreated: "Виртуальные агенты (созданные)",
        apiCliAccess: "Доступ к API / CLI",
        selfHosting: "Самостоятельный хостинг (опционально)",

        agentTypes: "Типы агентов",
        humanAgents: "Человеческие агенты",
        chatRagStorage: "Агенты Чат, RAG, Хранилище",
        speechTtsImageGen: "Агенты Речь→Текст, Текст→Речь, Генерация изображений",
        codeQuantumAvatar: "Агенты Код, Квант, Аватар",
        specializedAgents: "Специализированные агенты (3dGen, CRM, Блокчейн и др.)",

        modelProviders: "Провайдеры моделей",
        openAIChatGPT: "OpenAI (ChatGPT)",
        googleGenAI: "Google GenAI (Gemini)",
        extendedProviders: "Дополнительные провайдеры (Anthropic, Cohere, Ollama и др.)",

        integrationsDeployment: "Интеграции и развёртывание",
        useYourLlmKeys: "Использование собственных API-ключей LLM",
        useOurLlmKeys: "Использование наших API-ключей LLM (оплата по мере использования)",
        distributedSystems: "Распределённые системы и оркестрация",
        privateCloud: "Приватное облако / локальное развёртывание",
        socialPhoneIntegration: "Интеграция с соцмессенджерами и телефонией",
        unlimited: "Неограниченно",

        common: {
          included: "Включено",
          notIncluded: "Не включено"
        },
      },
    },
    Settings: {
      settings: 'Настройки',
      language: 'Язык',
      save: 'Сохранить',
      error: 'Ошибка',
    },
    Team: {
      sectionTitle: "Команда",
      sectionSubtitle: "Разнообразная команда лидеров с глубокими знаниями в бизнесе, технологиях и психологии.",

      artemName: "Артем Аракчеев, PhD, DBA",
      artemRole: "Основатель, технический директор",
      artemDescription:
        "Артем Аракчеев продвигает инновации как технологический лидер и предприниматель, специализируясь на ИИ, квантовых вычислениях и стартапах в области SaaS/PaaS. Он разрабатывает передовые решения, преуспевая в области смарт-контрактов, облачных технологий и full-stack разработки.",

      kateName: "Екатерина Мельникова",
      kateRole: "Директор по персоналу",
      kateDescription:
        "Екатерина Мельникова руководит с эмпатией и видением, сочетая знания в психологии, стратегии управления человеческим капиталом и арт-дирекшне. Она формирует сильную командную культуру и активно представляет компанию на отраслевых мероприятиях, выстраивая значимые связи.",
    },
    Mission: {
      missionTitle: "Миссия",
      missionText: "В <1>{{appName}}</1> наша миссия — расширять возможности человечества, предоставляя автономную агентную платформу, которая управляет бизнесом 24/7, генерирует доход и освобождает больше времени для людей на стратегические решения.",

      visionTitle: "Видение",
      visionParagraph1: "Представьте будущее, где интеллектуальные агентные команды двигают бизнес вперёд — команды, которые <1>саморазвиваются</1>, <3>самостоятельно продают</3> и <5>сами находят возможности</5>.",
      visionParagraph2: "Построенная на этих трёх фундаментальных принципах, наша платформа даёт агентному ИИ возможность сотрудничать во всех аспектах развития бизнеса — от поиска и финансирования стартапов до маркетинга, продаж, исследований, разработки и администрирования. Эти команды работают бок о бок с людьми, обучаясь у человеческого творчества, поведения и стратегии — с конечной целью автономно эволюционировать и охватить весь спектр бизнес-процессов.",
    },
    Mobile: {
      title: "Мобильные приложения",
      optionsTitle: "Варианты",
      optionsIntro: "Доступно 2 варианта мобильных приложений:",
      optionNative: "Нативные приложения для iOS и Android.",
      optionWeb: "Мобильное веб-приложение.",

      nativeTitle: "Нативные мобильные приложения",
      nativeSubheader: "Установка через Expo",
      nativeIntro: "Вы можете сразу протестировать наше мобильное приложение с помощью <1>Expo Go</1>. Сначала скачайте приложение Expo Go из магазина приложений:",
      getExpoGo: "Скачать Expo Go",
      scanQr: "Затем отсканируйте QR-код ниже, чтобы открыть наше приложение в Expo:",
      runtimeVersion: "Версия среды выполнения",
      published: "Опубликовано",
      qrAlt: "Установить по ссылке",
      nativeFallback: "Если вы не можете отсканировать QR-код, нажмите на кнопку:",
      installNative: "Установить нативное мобильное приложение",

      webTitle: "Мобильное веб-приложение",
      webSubheader: "Открыть ссылку",
      webIntro: "Вы также можете использовать наше полностью адаптивное мобильное веб-приложение, доступное прямо в вашем браузере:",
      openWebApp: "Открыть мобильное веб-приложение",
    },
    Security: {
      title: "Безопасность в {{appName}}",
      intro: "В <1>{{appName}}</1> безопасность и конфиденциальность нашей платформы, пользователей и ваших данных — наши главные приоритеты. Мы стремимся создавать агентные ИИ-системы, которые не только мощны и автономны, но и безопасны и устойчивы.",

      disclosureTitle: "Ответственное раскрытие информации",
      disclosureText: "Мы глубоко ценим исследователей, разработчиков и пользователей, которые помогают нам поддерживать безопасность {{appName}}. Если вы обнаружите уязвимость, мы призываем к ответственному раскрытию.",
      emailUs: "Напишите нам",

      disclosureDetailsTitle: "Пожалуйста, по возможности укажите:",
      disclosureList: {
        step: "Шаги для воспроизведения проблемы или работающий proof-of-concept (PoC).",
        tools: "Используемые инструменты или библиотеки, включая номера версий.",
        output: "Вывод инструментов или логи, связанные с уязвимостью."
      },

      commitmentTitle: "Обязательства по безопасности",
      commitmentList: {
        sdlc: "Безопасный жизненный цикл разработки программного обеспечения (SSDLC).",
        scanning: "Регулярное сканирование зависимостей и установка патчей.",
        pentesting: "Пентестинг и сторонние аудиты безопасности.",
        leastPrivilege: "Принцип наименьших привилегий во всей инфраструктуре.",
        encryption: "Шифрование данных в покое и при передаче."
      },

      openSourceTitle: "Безопасность открытого кода",
      openSourceText: "По вопросам уязвимостей в наших открытых компонентах смотрите репозитории на GitHub. Во многих есть файлы <1>SECURITY.md</1> с дополнительными инструкциями.",
      visitGitHub: "Перейти на GitHub",
      readSecurityMd: "Читать SECURITY.md",

      contactTitle: "Контакты",
      contactText: "Есть вопросы или опасения по безопасности в {{appName}}? Свяжитесь с нами по адресу <1>{{email}}</1>.",
    },
    Pricing: {
      journeyTitle: "От нуля до IPO",
      journeyText: "Создано для каждого этапа вашего пути. Начните сегодня — без необходимости вводить данные карты.",

      pricingTitle: "Цены",
      comparisonTitle: "Сравнение Цен",
    },
  },
};

i18n
  // .use(detector)
  // .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,

    // lng: "en",
    lng: language,

    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    // use en if detected lng is not available
    // fallbackLng: "en",
    fallbackLng: "en-US",
    debug: true,

    // TODO: Send not translated keys to endpoint
    //       https://www.i18next.com/how-to/extracting-translations
    saveMissing: false, // send not translated keys to endpoint
  });

export default i18n;

export function setI18nLanguage (language) {
  i18n
    .changeLanguage(language)
    .then((t) => {
      localStorage.setItem('i18n.language', language);
      // console.log('Language changed to:', language, ', title:', t('title'))
    })
    .catch((err) => {
      console.error('Error changing language:', err)
    })
}

export function LanguageSelector () {
  const [ language, setLanguage ] = useState(i18n.language)

  useEffect(() => {
    setI18nLanguage(language)
  }, [language]);

  // console.log('i18n.language:', i18n.language)

  return (
    <Dropdown
      placeholder='Select Language'
      // fluid
      search
      selection
      compact
      options={languageOptions}
      value={language}
      defaultValue='en-US'
      onChange={(e, { value }) => setLanguage(value) }
    />
  )
}
