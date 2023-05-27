import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
// import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';
import sgMail from '@sendgrid/mail';

if (
  !process.env.AWS_ACCESS_KEY_ID_MCMIKECAMARA ||
  !process.env.AWS_SECRET_ACCESS_KEY_MCMIKECAMARA ||
  !process.env.AWS_REGION_MCMIKECAMARA
) {
  throw new Error('Required environment variables are not set');
}

// Create a DynamoDB table
const messagesTable = new aws.dynamodb.Table('messagesTable', {
  attributes: [
    {
      name: 'id',
      type: 'S',
    },
  ],
  hashKey: 'id',
  billingMode: 'PAY_PER_REQUEST',
});

// Configure AWS SDK to use the correct region
const awsConfig = new pulumi.Config('aws');
const region = awsConfig.get('region') as aws.Region;
const awsProvider = new aws.Provider('provider', { region: region });

// Create an SES email identity to be used for sending emails
const sesEmailIdentity = new aws.ses.EmailIdentity('myEmailIdentity', {
  email: 'mike.camara.se@gmail.com',
});

const lambdaExecutionRole = new aws.iam.Role('lambdaExecutionRole', {
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Principal: {
          Service: 'lambda.amazonaws.com',
        },
      },
    ],
  }),
});

// Attach the AWSLambdaBasicExecutionRole policy to the IAM Role
const lambdaExecutionRolePolicy = new aws.iam.RolePolicyAttachment(
  'lambdaExecutionRolePolicy',
  {
    policyArn:
      'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    role: lambdaExecutionRole.name,
  }
);

// Attach required policies to the IAM Role
const requiredPolicies = [
  'arn:aws:iam::aws:policy/AWSLambda_FullAccess',
  'arn:aws:iam::aws:policy/AmazonSESFullAccess',
];

requiredPolicies.forEach((policyArn, index) => {
  const policyAttachment = new aws.iam.RolePolicyAttachment(
    `requiredPolicyAttachment${index}`,
    {
      policyArn,
      role: lambdaExecutionRole.name,
    }
  );
});

// Create a Lambda function that processes the form submission
const contactUsHandler = new aws.lambda.CallbackFunction(
  'contactUsHandler',
  {
    environment: {
      variables: {
        TABLE_NAME: messagesTable.name,
        SES_REGION: region,
        SES_FROM_ADDRESS: sesEmailIdentity.email,
      },
    },
    role: lambdaExecutionRole.arn,
    callback: async (event: APIGatewayProxyEvent) => {
      //   const AWS = require('aws-sdk');

      // const ddb = new aws.DynamoDB.DocumentClient({
      //   region: process.env.SES_REGION,
      // });

      const body = JSON.parse(event.body!);
      //   const params = {
      //     TableName: process.env.TABLE_NAME,
      //     Item: body,
      //   };

      //   // Store the form submission in the DynamoDB table
      //   await ddb.put(params).promise();

      // Send an email using SES
      //   const ses = new AWS.SES({ region: process.env.SES_REGION });

      //   const emailParams = {
      //     Destination: {
      //       ToAddresses: ['mike.camara.se@gmail.com'],
      //     },
      //     Message: {
      //       Body: {
      //         Text: { Data: `Message from ${body.sender}: ${body.message}` },
      //       },
      //       Subject: { Data: `New Message from ${body.sender}` },
      //     },
      //     Source: process.env.SES_FROM_ADDRESS,
      //   };

      //   try {
      //     await ses.sendEmail(emailParams).promise();
      //   } catch (error) {
      //     console.error('Error sending email:', error);
      //     throw error;
      //   }
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_AUTH);

      const msg = {
        to: 'mcmikecamara@gmail.com',
        from: 'mike.camara.se@gmail.com',
        subject: 'Hello world',
        text: 'Hello plain world!',
        html: '<p>Hello HTML world!</p>',
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        throw error;
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: body }),
      };
    },
    runtime: aws.lambda.Runtime.NodeJS18dX,
  },
  { provider: awsProvider }
);

// const messagesTable = new aws.dynamodb.Table('messagesTable', {
//   attributes: [
//     { name: 'id', type: 'S' },
//     { name: 'email', type: 'S' },
//   ],
//   hashKey: 'id',
//   rangeKey: 'email', // added this line
//   readCapacity: 5,
//   writeCapacity: 5,
// });

// const ses = new AWS.SES({ region: 'ap-southeast-2' }); // replace 'us-west-2' with your AWS region

// const contactUsHandler = new aws.lambda.CallbackFunction('contactUsHandler', {
//   callback: async (event) => {
//     const body = JSON.parse((event as any).body);
//     const ddb = new AWS.DynamoDB.DocumentClient();

//     // Store the form submission in the DynamoDB table
//     await ddb
//       .put({
//         TableName: messagesTable.name.get(),
//         Item: body,
//       })
//       .promise();

//     // Send an email using SES
//     try {
//       await ses
//         .sendEmail({
//           Destination: {
//             ToAddresses: ['mike.camara.se@gmail.com'],
//           },
//           Message: {
//             Body: {
//               Text: { Data: `Message from ${body.email}: ${body.message}` },
//             },
//             Subject: { Data: `Contact Us form submission from ${body.name}` },
//           },
//           Source: 'mike.camara.se@gmail.com',
//         })
//         .promise();
//     } catch (error) {
//       console.error('Error sending email', error);
//     }
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: 'Form submission processed successfully!',
//       }),
//     };
//   },
// });

const api = new aws.apigatewayv2.Api('contactUsApi', {
  protocolType: 'HTTP',
});

new aws.lambda.Permission('contactUsPermission', {
  action: 'lambda:InvokeFunction',
  function: contactUsHandler.arn,
  principal: 'apigateway.amazonaws.com',
  sourceArn: pulumi.interpolate`${api.executionArn}/*/*`,
});

// Add a new Lambda integration
const contactUsIntegration = new aws.apigatewayv2.Integration(
  'contactUsIntegration',
  {
    apiId: api.id,
    integrationType: 'AWS_PROXY',
    integrationUri: contactUsHandler.arn,
  }
);

// Modify the route to use the integration
const route = new aws.apigatewayv2.Route('contactUsRoute', {
  apiId: api.id,
  routeKey: 'POST /contact-us',
  target: pulumi.interpolate`integrations/${contactUsIntegration.id}`,
});

const deployment = route.apiId.apply(
  (id) =>
    new aws.apigatewayv2.Deployment('contactUsDeployment', {
      apiId: id,
    })
);

const stage = new aws.apigatewayv2.Stage('contactUsStage', {
  apiId: api.id,
  deploymentId: deployment.id,
  autoDeploy: true,
});

export const apiEndpoint = stage.invokeUrl;
