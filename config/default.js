/*
 * Global settings for app
 */

module.exports = {
	name: 'My Project',
	domain: 'yourdomain.com',
	
	port: 80,
	
	secret: 'your secret here',
//	cookie: {path: '/', httpOnly: true, secure: false, maxAge: null},
	
	session: {
//		name: 'connect.sid',
		saveUninitialized: false,
		resave: false,
		storeOptions: {
//			collection: 'sessions',
//			ttl: 14 * 24 * 3600, // 14 days
			touchAfter: 3 * 60
		}
	},
	
	mailer: {
		from: 'hello@example.com',
				
		host: 'smtp.example.com', // hostname
		secureConnection: true, // use SSL
		
		port: 465, // port for secure SMTP
		transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
		
		auth: {
			user: 'demo',
			pass: '123456'
		}
	}
};