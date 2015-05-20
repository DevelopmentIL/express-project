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
	
	cache: {
		store: 'memory',
		max: 100,
		ttl: 600 // seconds
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
	},
	
	logger: {
		console: false,
		access: {
			filename: './logs/access.log'
		},
		error: {
			filename: './logs/error.log'
		}
	}
};