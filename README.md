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
  h1 Daftar Data

  // Search Form
  form(action="/gigs", method="get")
    input(type="text", name="name", placeholder="Cari Nama", value=(searchTerm ? searchTerm : ''))
    button(type="submit") Cari

  a(href="/gigs/add") +Tambah Data Baru

  table
    thead
      tr
        th No.
        th Nama
        th Umur
        th Negara
        th Kota
        th Aksi
    tbody
      each list in lists
        tr
          td #{list.id}
          td #{list.name}
          td #{list.age}
          td #{list.country}
          td #{list.city}
          td.actions
            a(href=`/gigs/update/${list.id}`) UPDATE
            form(action=`/gigs/delete/${list.id}`, method="post", style="display: inline;")
              button.delete(type="submit" onclick="return confirm('Yakin ingin menghapus?')") DELETE
              
