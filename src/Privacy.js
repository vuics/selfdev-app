import {
  Container,
  Divider,
  Segment,
} from 'semantic-ui-react'
import { QCMarkdown } from './components/Text'
import conf from './conf'

const privacyMarkdown = `
# Privacy Policy

AZ1 is a platform that provides self-developing AI. We respect your privacy and we are committed to protecting your personal data. This privacy policy explains how we collect, use, and share your personal data when you use AZ1.

## What personal data do we collect?

We collect the following personal data from you when you use AZ1:

* Your name and email address.
* Your IP address.
* The information you provide when you create an account, such as your username and password.
* The information you provide when you use AZ1, such as the questions you ask and the answers you receive.
* The information you provide when you contact us for support, such as your contact information and the nature of your inquiry.

## How do we use your personal data?

We use your personal data to provide you with the services you have requested, such as access to AZ1, support chat, and analysis of your data. We also use your personal data to improve our product and to send you marketing communications.

## Who do we share your personal data with?

We may share your personal data with third-party service providers who help us provide our services, such as hosting providers and analytics providers. We may also share your personal data if we are required to do so by law or if we believe that sharing is necessary to protect our rights or the rights of others.

## How do we protect your personal data?

We take measures to protect your personal data, such as using secure servers and encryption. We also have procedures in place to deal with any suspected data breaches.

## Your rights

You have the right to access, correct, or delete your personal data. You can also object to the processing of your personal data. To exercise these rights, please contact us at ${conf.contact.email}.

## Changes to this privacy policy

We may modify these privacy policy at any time without notice. Your continued use of AZ1 after any modification constitutes your acceptance of the modified privacy policy.

## Contact us

If you have any questions about this privacy policy, please contact us at ${conf.contact.email}.
`

const Privacy = () => (
  <Container>
    <Divider hidden />
    <Segment>
      <QCMarkdown dark>
        { privacyMarkdown }
      </QCMarkdown>
    </Segment>
    <Divider hidden />
  </Container>
)
export default Privacy

