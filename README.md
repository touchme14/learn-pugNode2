**In here im adding search function using **
------------------------------------------------------------------------
router.get('/', async (req, res) => {
    const { name } = req.query; // Get the name from the query parameter

    try {
        let lists;
        if (name) { // If a name is provided, search
            lists = await list.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%` // Case-insensitive search
                    }
                }
            });
        } else { // If no name provided, show all
            lists = await list.findAll();
        }

        res.render('index', { lists: lists, searchTerm: name }); // Pass searchTerm

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
------------------------------------------------------------------------
**on gigs.js**

**also changing the index.pug into**
------------------------------------------------------------------------
extends layouts/main

block content
    h1 Daftar Data  // Your title

    // Search Form
    form(action="/gigs", method="get")  // Action goes to the main route
        input(type="text", name="name", placeholder="Cari Nama", value=(searchTerm ? searchTerm : ''))
        button(type="submit") Cari

    // The rest of your table code (unchanged)
    table
        // ... (table header)
        tbody
            each list in lists
                tr
                    td #{list.no} // Assuming you have a 'no' field
                    td #{list.name}
                    td #{list.umur}
                    td #{list.negara}
                    td #{list.kota}
                    td.actions
                        a(href=`/gigs/update/${list.id}`) UPDATE
                        form(action=`/gigs/delete/${list.id}`, method="post", style="display: inline;")
                            button.delete(type="submit" onclick="return confirm('Yakin ingin menghapus?')") DELETE

    // Add New Data link (unchanged)
    a(href="/gigs/add") +Tambah Data Baru
