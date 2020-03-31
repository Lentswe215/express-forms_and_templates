const {Client} = require('pg')
const express = require("express")
const app = express();


const client = new Client({
    "user": "user",
    "password":"pass",
    "host":"localhost",
    "port": 5432,
    "database": "musicplaylist"
});

app.get("/mymusic", (req, res) =>{
res.send(s1.deleteAllSong())
})

var server = app.listen(3000, () =>{ 
    let host = server.address().address
    let port = server.address().port
    console.log(`web server listening.. on http://${host}:${port}`)})


class Song
{
    constructor(song, artist, featuring, album, year){
        this.song = song;
        this.artist = artist;
        this.featuring = featuring;
        this.album =album;
        this.year =year;
    }
    

async connect(){
    try{
        await client.connect();
       
    } 
    catch(e){
        console.log("Failed to connect " + e)
    }
}

async addSong(){
    await this.connect()
try {
   await client.query('INSERT into mymusic (song, artist, featuring, album, year) Values($1,$2,$3,$4,$5)', [this.song, this.artist, this.featuring, this.album, this.year])
    console.log("Song added")
} catch(e){
    console.log(`Song not added ${e}`);
}
}

async viewPlaylist(){

    await this.connect()

    try{
        let res = await client.query("SELECT * from mymusic")
        console.table(res.rows)
    }
    catch(e) {
        console.log("Cannot view the playlist" + e)
    }
}
async updateDetails(field, newInfo) {
    await this.connect()

    try{
        await client.query(`UPDATE mymusic SET ${field} = $1 WHERE song = $2`, [newInfo, this.song])
        console.log(`${this.song} details updated`)     
        } catch(e) {
            console.log(`Song details not updated ${e}`)
        }
    }
async deleteSong(songid){
    await this.connect()

    try {
        await client.query(`DELETE from mymusic WHERE songid = $1`,[songid])
        console.log(`Song deleted`)
    } catch (e) {
        console.log(`Song not deleted : ${e}`) 
    }
}

async deleteAllSong(){
    await this.connect()

    try {
        await client.query(`DELETE from mymusic`)
        console.log(`Song deleted`)
    } catch (e) {
        console.log(`Song not deleted : ${e}`) 
    }
}
}
let s1 = new Song("Don't judge me", "Ty Dolla $ign", "Future", "Beach House 3", "2017")

// s1.viewPlaylist()