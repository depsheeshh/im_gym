const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db')
const Member = require('./model/member')

const app = express();
const port = 3000;

// Setup Method Override
app.use(methodOverride('_method'));

// Built-in Middleware
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));
// EJS
app.set('view engine', 'ejs');
// Third-Party Middleware
app.use(expressLayout);

// Configuration flash
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 6000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main',
        title: 'Home',
    });
})

app.get('/about', (req, res, next) => {
    res.render('about', {
        layout: 'layouts/main',
        title: 'About',
    })
})

app.get('/member', async(req, res) => {
    const members = await Member.find();
    res.render('member', {
        layout: 'layouts/main',
        title: 'Member',
        members,
        msg: req.flash('msg'),
    })
})

// Form tambah data
app.get('/member/add' , (req, res) => {
    res.render('add-member', {
        layout: 'layouts/main',
        title: 'Tambah Member',
    })
})

// Tambah data
app.post('/member', [
    body('nama').custom(async (value) => {
        const duplicate = await Member.findOne({nama: value});
        if (duplicate) {
            throw new Error('Nama sudah terdaftar');
        }
        return true;
    }),
    check('email', 'Email Ga Valid Bosku!').isEmail(),
    check('nohp', 'Nomor HP Gak Valid!').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('add-member', {
            layout: 'layouts/main',
            title: 'Tambah Member',
            errors: errors.array(),
        })
    } else {
        Member.insertMany(req.body, (err,result) => {
            req.flash('msg', 'Data Berhasil Ditambahkan!' );
            res.redirect('/member');
        });
    }
})

// Form Edit Member
app.get('/member/edit/:nama', async(req, res) => {
    const member = await Member.findOne({nama: req.params.nama});
    res.render('edit-member', {
        layout: 'layouts/main',
        title: 'Edit Member',
        member,
    })
})

// Edit Member
app.put('/member', [
    body('nama').custom(async(value, { req }) => {
        const duplicate = await Member.findOne({nama: value});
        if (value !== req.body.oldNama && duplicate) {
            throw new Error('Nama sudah terdaftar');
        }
        return true;
    }),
    check('email', 'Email Ga Valid Bosku!').isEmail(),
    check('nohp', 'Nomor HP Gak Valid!').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('edit-member', {
            layout: 'layouts/main',
            title: 'Edit Member',
            errors: errors.array(),
            member: req.body,
        })
    } else {
        Member.updateOne(
            {_id: req.body._id},
            {
                $set: {
                    nama: req.body.nama,
                    umur: req.body.umur,
                    email: req.body.email,
                    nohp: req.body.nohp
                }
            }
        ).then((result) => {
            req.flash('msg', 'Data Berhasil Diupdate!' );
            res.redirect('/member');
        });
    }
})

// Delete Member
app.delete('/member', (req, res) => {
    Member.deleteOne({_id: req.body._id}).then((result) => {
        req.flash('msg', 'Data Berhasil Dihapus!' );
        res.redirect('/member');
    })
})

// Detail member
app.get('/member/:nama', async(req, res) => {
    const member = await Member.findOne({ nama: req.params.nama });
    res.render('detail', {
        layout: 'layouts/main',
        title: 'Member Details',
        member,
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})