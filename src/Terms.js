import {
  Container,
  Divider,
  Segment,
} from 'semantic-ui-react'
import { QCMarkdown } from './components/Text'
import conf from './conf'

const termsMarkdown = `
# Terms of Service

Welcome to AZ1, a platform that provides self-developing AI. By using AZ1, you agree to these terms of service.

## 1. Definitions

* "AZ1" means the platform that provides self-developing AI.
* "User" means any individual who uses AZ1.
* "Personal data" means any information that can be used to identify an individual, such as their name, email address, or IP address.
* "Cookie" means a small file that is stored on a user's computer when they visit a website.

## 2. Scope

These terms of service apply to all users of AZ1, regardless of their location.

## 3. Modifications

We may modify these terms of service at any time without notice. Your continued use of AZ1 after any modification constitutes your acceptance of the modified terms of service.

## 4. Cookie Policy

We use cookies to provide you with a better experience on AZ1. Cookies are small files that are stored on your computer when you visit a website. We use cookies to remember your login session, to provide you with support chat, and to analyze your data to improve our product.

## 5. Liability

We are not liable for any damages caused by your use of AZ1. This includes, but is not limited to, damages caused by errors, omissions, or interruptions in the service.

## 6. Governing Law

These terms of service are governed by the laws of the State of Delaware. Any disputes arising out of these terms of service will be resolved in the courts of the State of Delaware.

## 7. Entire Agreement

These terms of service constitute the entire agreement between you and us regarding the use of AZ1. They supersede any prior or contemporaneous communications, representations, or agreements, whether oral or written.

## 8. Severability

If any provision of these terms of service is found to be invalid or unenforceable, such provision will be struck from these terms of service and the remaining provisions will remain in full force and effect.

## 9. Waiver

Our failure to enforce any provision of these terms of service will not be considered a waiver of such provision.

## 10. Contact Us

If you have any questions about these terms of service, please contact us at ${conf.contact.email}.
`

const Terms = () => (
  <Container>
    <Divider hidden />
    <Segment>
      <QCMarkdown dark>
        { termsMarkdown }
      </QCMarkdown>
    </Segment>
    <Divider hidden />
  </Container>
)
export default Terms

