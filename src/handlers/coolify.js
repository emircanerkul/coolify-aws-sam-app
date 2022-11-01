
const ttp = require('text-to-picture')
var aws = require("aws-sdk");
const bucket = process.env.BUCKET;

/**
 * A Lambda function that coolify yourself :)
 */
exports.coolifier = async (event) => {
    var ses = new aws.SES({ region: "eu-central-1" });
    var s3 = new aws.S3({ apiVersion: '2006-03-01' });

    const buf = await (await ttp.convert({
        text: 'You\'r so COOOOL! \n\t' + decodeURI(event.pathParameters.name),
        size: 16,
    })).getBuffer();

    const uploadedImage = await s3.upload({
        Bucket: bucket,
        Key: event.pathParameters.name.toLowerCase() + '.png',
        Body: buf, ContentType: 'image/png'
    }).promise();

    const accessUrl = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: uploadedImage.Key
    });

    await ses.sendEmail({
        Destination: {
            ToAddresses: [event.pathParameters.email],
        },
        Message: {
            Body: {
                Html: { Data: "Get your coolified image by clicking <a href='" + accessUrl + "'>here</a> or copy bellowed url into your browser <pre>" + accessUrl + "<pre>" },
            },
            Subject: { Data: "Here is your Coolified Image!" },
        },
        Source: "yourapprovedemail@gmail.com",
    }).promise();

    return {
        statusCode: 200,
        body: 'The coolified Image has been sent to <code>' + event.pathParameters.email + '</code>',
        headers: {
            'Content-Type': 'text/html',
        }
    };

}
