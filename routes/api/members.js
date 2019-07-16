
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../members')


router.get('/', (req, res) => {
    res.json(members);
})

router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        res.json(members.filter((member) => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ message: `NEMA ${req.params.id}`})
    }
})

router.post('/', (req, res) => {

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return   res.status(400).json({ message: `Please include a name and email`});
    }

    members.push(newMember)
    res.json(members);
})


router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    console.log(found)

    if(found) {
        const updateMember = req.body; 
        console.log(updateMember)
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;;
            }
            res.json({ message: 'Member updated', member});
        })

    } else {
        res.status(400).json({ message: `NEMA ${req.params.id}`})
    }
})

module.exports = router;