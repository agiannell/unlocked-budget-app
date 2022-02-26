const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env,
      aws = require('aws-sdk');

module.exports = {
    updateUserInfo: (req, res) => {
        const { firstName, lastName, userEmail } = req.body,
              { user_id } = req.params,
              db = req.app.get('db');

        db.users.update_user_info(user_id, firstName, lastName, userEmail)
            .then(user => {
                res.status(200).send(user[0])
            })
            .catch(err => res.status(500).send(err))
    },
    getSignedUrl: (req, res) => {
        aws.config = {
            region: 'us-west-1',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }

        const s3 = new aws.S3(),
              fileName = req.query['file-name'],
              fileType = req.query['file-type'],
              s3Params = {
                  Bucket: S3_BUCKET,
                  Key: fileName,
                  Expires: 60,
                  ContentType: fileType,
                  ACL: 'public-read'
              };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err) {
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${ S3_BUCKET }.s3.amazonaws.com/${ fileName }`
            };

            return res.send(returnData)
        });
    },
    updateProfilePic: (req, res) => {
        const { profile_pic } = req.body,
              { user_id } = req.params,
              db = req.app.get('db');

        db.users.update_profile_pic(user_id, profile_pic)
            .then(user => {
                res.status(200).send(user[0])
            })
            .catch(err => res.status(500).send(err))
    },
    getUser: (req, res) => {
        if(req.session.user) {
            return res.status(200).send(req.session.user)
        }
        res.status(404).send('user not found')
    }   
}