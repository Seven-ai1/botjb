const { create, Client } = require('@open-wa/wa-automate')
const { decryptMedia } = require('@open-wa/wa-automate')
const data = require("./databotwa/data")
const config = require("./botwaconfig.json")
const fs = require("fs")
const path = require("path");
const { exec } = require("child_process")
const kill = require("child_process").exec
const bcrypt = require("bcrypt");
const gradient = require('gradient-string');

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)
  
  arrayOfFiles = arrayOfFiles || []
  
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
        arrayOfFiles.push(path.join(__dirname, dirPath, file))
    }
  })
  
  return arrayOfFiles
}

const { 
  menuId, 
  cekResi, 
  urlShortener, 
  meme, 
  translate, 
  getLocationData,
  images,
  resep,
  rugapoi,
  rugaapi,
  cariKasar
} = require('./lib')

const { 
  msgFilter, 
  color, 
  processTime, 
  isUrl,
download
} = require('./utils')
 
  
const convertBytes = function(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  
  if (bytes == 0) {
    return "n/a"
  }


  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  
  if (i == 0) {
    return bytes + " " + sizes[i]
  }
  
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}

  
const getTotalSize = function(directoryPath) {
  const arrayOfFiles = getAllFiles(directoryPath)
  
  let totalSize = 0
  
  arrayOfFiles.forEach(function(filePath) {
    totalSize += fs.statSync(filePath).size
  })
  
  return convertBytes(totalSize)
}
  
const isRunning = (query, cb) => {
  let platform = process.platform;
  let cmd = '';
  switch (platform) {
      case 'win32' : cmd = `tasklist`; break;
      case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
      case 'linux' : cmd = `ps -A`; break;
      default: break;
  }
  kill(cmd, (err, stdout, stderr) => {
      cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
  })
}

const start = async (client = new Client()) => {
try {
  console.log(gradient.instagram('               ×××Bot GTPS By Lyrtle Security×××'))
  console.log(gradient.instagram('                      ╦ ╦ ╦╦═╗╔╦╗╦  ╔═╗'))
  console.log(gradient.instagram('                      ║ ╚╦╝╠╦╝ ║ ║  ║╣ '))
  console.log(gradient.instagram('                      ╩═╝╩ ╩╚═ ╩ ╩═╝╚═╝'))
  console.log(gradient.instagram('                          Smile Dude:)                  '))
  console.log(gradient.instagram('            ╔═══════╦══════════════════════════╦═══════╗'))
  console.log(gradient.instagram('            ║╔╗═════╩══════════════════════════╩═════╔╗║'))
  console.log(gradient.instagram('            ╚╝║ ---     Welcome To Lyrtle     ---    ║╚╝'))
  console.log(gradient.instagram('        ╔═════╚══════════════════════════════════════╝═════╗'))
  console.log(gradient.instagram('       ╔╣    ---         WA : +6288214018974       ---     ╠╗'))
  console.log(gradient.instagram('       ║╚══════════════════════════════════════════════════╝║'))
  console.log(gradient.instagram('       ╚╗      ---    https://discord.gg/HBYbwkJGzt    --- ╔╝'))
  console.log(gradient.instagram('        ╚══════════════════════════════════════════════════╝'))
  console.log(gradient.instagram('                            BOT Is Online'))
        // Force it to keep the current session
        client.onStateChanged((state) => {
            console.log(gradient.instagram('[Client]', state))
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
        })
        client.onIncomingCall(( async (call) => {
            await client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. Auto Blokir.')
            .then(() => client.contactBlock(call.peerJid))
        }))
        //Command Here
        client.onMessage(async (message) => {
            const welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
            const { from, id, sender, type, isGroupMsg, caption, chat, chatId, isMedia, quotedMsg, quotedMsgObj, mentionedJidList} = message
            const isOwner = config.ownerNumber.includes(sender.id)
            const uaOverride = process.env.UserAgent
            const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
            let { body } = message
            const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
            body = (type === 'chat' && body.startsWith(config.prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(config.prefix)) ? caption : ''
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const pengirim = sender.id
            const groupId = isGroupMsg ? chat.groupMetadata.id : ''
            const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
            const botNumber = await client.getHostNumber() + '@c.us'
            const mentions = (teks, memberr, id) => { (id == null || id == undefined || id == false) ? nayla.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : nayla.sendMessage(from, teks.trim(), extendedText, { quoted: nay1, contextInfo: { "mentionedJid": memberr } }) }
            const mentionByTag = type == "extendedTextMessage" && nay.message.extendedTextMessage.contextInfo != null ? nay.message.extendedTextMessage.contextInfo.mentionedJid : []
            const mentionByReply = type == "extendedTextMessage" && nay.message.extendedTextMessage.contextInfo != null ? nay.message.extendedTextMessage.contextInfo.participant || "" : ""
            const mention = typeof (mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
            mention != undefined ? mention.push(mentionByReply) : []
            const mentionUser = mention != undefined ? mention.filter(n => n) : []
            const isGroupAdmins = groupAdmins.includes(sender.id) || false
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && !isOwner && !isMedia) {
                if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi)) || chats.match(new RegExp(/(wa.me)/gi)) || chats.match(new RegExp(/(https:\/\/youtu.be)/gi)) || chats.match(new RegExp(/(https:\/\/m.youtube.com)/gi)) || chats.match(new RegExp(/(https:\/\/bit.ly)/gi))) {
                    client.reply(from, `「 ANTI LINK 」\n\nJangan Promote Ya Sayang\nMaaf Harus Aku Kick!!~`, id).then(() => {
                    client.removeParticipant(groupId, sender.id)
                  })      
                }
            }
            
            
            if (command == "test") {
                return client.sendText(from, "Work!")
            }
                if (command == "role") {
                    return client.sendText(from, 'list role ${config.pricerole}', id)
                }
                if (command == "menu") {
                  if (!isGroupMsg) return;
                    return client.sendText(from, `
┃ HALOO!! User <3
┗━━━━━━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━━━━━
┃╔═❲ GROUP MENU ❳═>
┃║⛇ ${config.prefix}hidetag
┃║⛇ ${config.prefix}delete
┃║⛇ ${config.prefix}tagall
┃║⛇ ${config.prefix}setdesc
┃║⛇ ${config.prefix}bc
┃║⛇ ${config.prefix}setname
┃║⛇ ${config.prefix}setpp
┃║⛇ ${config.prefix}listonline
┃║⛇ ${config.prefix}add
┃║⛇ ${config.prefix}kick
┃║⛇ ${config.prefix}antilink
┃║⛇ ${config.prefix}promote
┃║⛇ ${config.prefix}demote
┃║⛇ ${config.prefix}kickall
┃║⛇ ${config.prefix}kickrandom
┃║⛇ ${config.prefix}sms
┃╚══════════════════════
┏━━━━━━━━━━━━━━━━━━━━━━
┃╔═❲ JB Menu ❳═>
┃║⛇ ${config.prefix}rekber
┃║⛇ ${config.prefix}payment
┃║⛇ ${config.prefix}admin
┃╚══════════════════════
┗━━━━━━━━━━━━━━━━━━━━━━━  `)
              }
            //manage grup command
              if (command == "bc") {
                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
              if (args.length == 0) return client.reply(from, `Untuk broadcast ke semua chat ketik:\n${config.prefix}bc [isi chat]`)
            let msg = body.slice(4)
            const chatz = await client.getAllChatIds()
            for (let idk of chatz) {
                var cvk = await client.getChatById(idk)
                if (!cvk.isReadOnly) client.sendText(idk, `〘 *L Y R T L E  B C* 〙\n\n${msg}`)
                if (cvk.isReadOnly) client.sendText(idk, `〘 *L Y R T L E  B C* 〙\n\n${msg}`)
            }
            client.reply(from, 'Broadcast Success!', id)
            } 
            if (command == "ownerbot") {
                return client.sendText(from, "*Saya Adalah Lyrtle Bot Yang Di Buat Oleh Kyy*\nJika Kamu Mau Menggunakan Saya Chat Ke:\nwa.me/6288214018974\n\nSalam Hangat Kyy<3")
            }
            if (command == "rekber") {
              if (!isGroupMsg) return;
                return client.sendText(from, `
┃ HALOO!! User <3
┗━━━━━━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━━━━━
┃╔═❲ FEE REKBER ❳═>
┃║⛇0-20  = 1k
┃║⛇20-35 = 2k
┃║⛇35-45 = 3k
┃║⛇45-50 = 4k
┃║⛇50-60 = 5k
┃║⛇60-70 = 6k
┃║⛇70-80 = 7k
┃║⛇80-90 = 8k
┃╚══════════════════════
              `)  
          }
          if (command == "payment") {
            if (!isGroupMsg) return;
              return client.sendText(from, `
┃ HALOO!! User <3
┗━━━━━━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━━━━━
┃╔═❲ PAYMENT ❳═>
┃║⛇ADMIN KYY:
┃║⛇DANA:088214018974
┃║⛇GOPAY:088214018974
┃║⛇OVO:088214018974
┃║⛇
┃║⛇ADMIN DIPZY:
┃║⛇DANA:085750623319
┃║⛇GOPAY:085750623319
┃║⛇
┃║NOTE TANYAKAN DULU
┃║PAYMENT YG TERSEDIA
┃║DAN ADMIN YG MENANGANI
┃╚══════════════════════
            `)
              }
              if (command == "admin") {
                if (!isGroupMsg) return;
                  return client.sendText(from, `
┃ HALOO!! User <3
┗━━━━━━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━━━━━
┃╔═❲ ADMIN ❳═>
┃║⛇ADMIN KYY:
┃║⛇wa.me/+628818086251
┃║⛇
┃║⛇ADMIN DIPZY:
┃║⛇wa.me/+6285750623319
┃║⛇
┃║NOTE TANYAKAN DULU
┃║PAYMENT YG TERSEDIA
┃║DAN ADMIN YG MENANGANI
┃╚══════════════════════
                `)}
  
            if (command == "tagall"){
              if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
              if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
              const groupMem = await client.getGroupMembers(groupId)
              let hehex = '╔══✪〘 Mention All 〙✪══\n'
              for (let i = 0; i < groupMem.length; i++) {
                  hehex += '╠➥'
                  hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
              }
              hehex += '╚═〘 *L Y R T L E  B O T* 〙'
              await client.sendTextWithMentions(from, hehex)
    }
    if (command == "setpp"){
      if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
      if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
      if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
      if (isMedia && type == 'image' || isQuotedImage) {
        const dataMedia = isQuotedImage ? quotedMsg : message
        const _mimetype = dataMedia.mimetype
        const mediaData = await decryptMedia(dataMedia, uaOverride)
        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
        await client.setGroupIcon(groupId, imageBase64)
        } else if (args.length === 1) {
        if (!isUrl(url)) { await client.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
        client.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
        ? client.reply(from, 'Maaf, link yang kamu kirim tidak memuat gambar.', id)
        : client.reply(from, 'Berhasil mengubah profile group', id))
        } else {
          client.reply(from, `Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption ${config.prefix}setprofile\n\n2. Silahkan ketik ${config.prefix}setprofile linkImage`)
    }
      }
      if (command == "del"){
        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                  if (!quotedMsg) return client.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${config.prefix}del`, id)
                  if (!quotedMsgObj.fromMe) return client.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${config.prefix}del`, id)
                  client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
        }
      if (command == "welcome"){
        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                  if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                  if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
            if (args.length !== 1) return client.reply(from, `Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${config.prefix}welcome on --aktifkan\n${config.prefix}welcome off --nonaktifkan`, id)
            if (args[0] == 'on') {
              welcome.push(chatId)
              fs.writeFileSync('./settings/welcome.json', JSON.stringify(welcome))
              client.reply(from, 'Welcome Message sekarang diaktifkan!', id)
            } else if (args[0] == 'off') {
              let xporn = welcome.indexOf(chatId)
              welcome.splice(xporn, 1)
              fs.writeFileSync('./settings/welcome.json', JSON.stringify(welcome))
              client.reply(from, 'Welcome Message sekarang dinonaktifkan', id)
            } else {
              client.reply(from, `Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${config.prefix}welcome on --aktifkan\n${config.prefix}welcome off --nonaktifkan`, id)
            }
        }
            if (command == "add"){
              if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
              if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
              if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
              if (args.length !== 1) return client.reply(from, `Untuk menggunakan ${config.prefix}add\nPenggunaan: ${config.prefix}add <nomor>\ncontoh: ${config.prefix}add 628xxx`, id)
                  try {
                    await client.addParticipant(from,`${args[0]}@c.us`)
                  } catch {
                    client.reply(from, 'Tidak dapat menambahkan target', id)
                }
              }
            if (command == "kick") {
                if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri', id)
                await client.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.')
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
            }
            if (command == "kickall"){
              if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    let isOwner = chat.groupMetadata.owner == pengirim
                    if (!isOwner) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai oleh owner grup!', id)
                    if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        const allMem = await client.getGroupMembers(groupId)
                        for (let i = 0; i < allMem.length; i++) {
                            if (groupAdmins.includes(allMem[i].id)) {
            
                            } else {
                                await client.removeParticipant(groupId, allMem[i].id)
                            }
                        }
                        client.reply(from, 'Success kick all member', id)
              }
              //other command
              if (command == "shortlink"){
                if (args.length == 0) return client.reply(from, `ketik ${config.prefix}shortlink <url>`, id)
                          if (!isUrl(args[0])) return client.reply(from, 'Maaf, url yang kamu kirim tidak valid.', id)
                          const shortlink = await urlShortener(args[0])
                          await client.sendText(from, shortlink)
                          .catch(() => {
                              client.reply(from, 'Ada yang Error!', id)
                          })
                }
              //gtps command
            if (command == "start") {
                if (!isGroupMsg) return;
                if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
                fs.access(config.exegtps, (err) => {
                    if (err) {
                    console.log(err)
                    return client.sendText(from, `${config.exegtps} not found!`)
                    }
                      exec(`start ${config.exegtps}`)
                    return client.reply(from, "Server now is UP!", id)
                })
            }
            if (command == "stop") {
                if (!isGroupMsg) return;
                if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
               {
                    kill(`taskkill /f /im ${config.exegtps}`)
                    return client.reply(from, "Server now is DOWN!", id)
                }
            }
            if (command == "status") {
                if (!isGroupMsg) return;
                fs.readFile(`${config.playeronline}`, (err, count) => {
                if (err) return console.log(err)
                isRunning(config.exegtps, (status) => {
                    if (status === true)
                    {
                      return client.reply(from, `📊 Server Status 📊\n\nServer Is UP!\n*Players Online:* ${count}\n\n*${config.nameserver} Status Server*`, id)
                    }
                    else
                    {
                      return client.reply(from, `📊 Server Status 📊\n\nServer Is DOWN!\n*Players Online: 0*\n\n*${config.nameserver} Status Server*`, id)
                    }
                })
              })
            }
            if (command == "giverole") {
                if (!isGroupMsg) return;
                if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
                const user = args[0]
                const role = args[1]
                if(!user) return client.reply(from, `Usage: ${config.prefix}giverole <playername> <role number>`, id);

                if(!role) return client.reply(from, `Usage: ${config.prefix}giverole <playername> <role number>`, id);

                if (!fs.existsSync(config.player)) {
                    return client.reply(from, "Player Folder not found!", id)
                }
                if (!fs.existsSync(config.player + "/" + user + ".json")) {
                return  client.reply(from, "Player Not Found!", id)
                }
                let playername1 = `./${config.player}/${args[0]}.json`
                let playername2 = require(playername1);
                const rolenum =  parseInt(role)

                playername2.adminLevel = rolenum;

                fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
                if (err) return console.log(err);
                return client.reply(from, `Role has been Gived!\nPlayer Name: ${args[0]}\nGive Role Number: ${args[1]}`, id);
                })
            }
            if (command == "givelevel") {
                if (!isGroupMsg) return;
                if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
                const user = args[0]
                const levels = args[1]
                if(!user) return client.reply(from, `Usage: ${config.prefix}givelevel <playername> <amount>`, id);

                if(!levels) return client.reply(from, `Usage: ${config.prefix}givelevel <playername> <amount>`, id);

                if (!fs.existsSync(config.player)) {
                    return client.reply(from, "Player Folder not found!", id)
                }
                if (!fs.existsSync(config.player + "/" + user + ".json")) {
                return  client.reply(from, "Player Not Found!", id)
                }
                let playername1 = `./${config.player}/${args[0]}.json`
                let playername2 = require(playername1);

                var contents = fs.readFileSync(playername1);
                var jsonContent = JSON.parse(contents);
                var newlev2 = parseInt(jsonContent.level)
                var levargs = parseInt(levels)
                newlev2 += levargs
                const levelss =  parseInt(newlev2)

                playername2.level = levelss;

                fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
                return client.reply(from, `Level has been Gived!\nPlayer Name: ${args[0]}\nGive Level: ${args[1]}\nTotal Level: ${playername2.level}`, id)
                })
            }
            if (command == "takelevel") {
                if (!isGroupMsg) return;
                if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
                const user = args[0]
                const levels = args[1]
                if(!user) return client.reply(from, `Usage: ${config.prefix}takelevel <playername> <amount>`, id);

                if(!levels) return client.reply(from, `Usage: ${config.prefix}takelevel <playername> <amount>`, id);

                if (!fs.existsSync(config.player)) {
                    return client.reply(from, "Player Folder not found!", id)
                }
                if (!fs.existsSync(config.player + "/" + user + ".json")) {
                return  client.reply(from, "Player Not Found!", id)
                }
                let playername1 = `./${config.player}/${args[0]}.json`
                let playername2 = require(playername1);

                var contents = fs.readFileSync(playername1);
                var jsonContent = JSON.parse(contents);
                var newlev2 = parseInt(jsonContent.level)
                var levargs = parseInt(levels)
                newlev2 -= levargs
                const levelss =  parseInt(newlev2)

                playername2.level = levelss;

                fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
                return client.reply(from, `Level has been Taked!\nPlayer Name: ${args[0]}\nTake Level: ${args[1]}\nTotal Level: ${playername2.level}`, id)
                })
            }
         
            if (command == "givegems") {
              if (!isGroupMsg) return;
              if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
              const user = args[0]
              const gems = args[1]
              if(!user) return client.reply(from, `Usage: ${config.prefix}givegems <playername> <amount>`, id);

              if(!gems) return client.reply(from, `Usage: ${config.prefix}givegems <playername> <amount>`, id);

              if (fs.existsSync(`./` + config.gemfolder + `/${args[0]}.txt`)) {

              if (!fs.existsSync(`./` + config.gemfolder + `/${args[0]}.txt`)) {
                return message.reply("gemdb folder not found!")
              }
              let gemdb2 = `./` + config.gemfolder + `/${args[0]}.txt`
              var contents1 = fs.readFileSync(gemdb2);
              var newgem3 = parseInt(contents1)
              var gemargs2 = parseInt(gems)
              newgem3 += gemargs2
              const gemssdb =  parseInt(newgem3)
                fs.writeFile(gemdb2, gemssdb.toString(), function() {
                  const rgemdb = fs.readFileSync(gemdb2)
                  return client.reply(from, `Gems has been Gived!\n\nof player named: ${args[0]}\nGems Amount: ${args[1]}\nTotal Gems: ${rgemdb}`, id)
                })
                return
              }
      
              if (!fs.existsSync(config.player)) {
                return client.reply(from, "Player Folder not found! Please set on config.json", id)
              }
      
              fs.access(`./` + config.player + `/${args[0]}.json`, fs.F_OK, (err) => {
                if (err) {
                  return  client.reply(from, "Player Not Found!", id)
              }
      
              let playername1 = `./` + config.player + `/${args[0]}.json`
              let playername2 = require(playername1);
              
              var contents = fs.readFileSync(playername1);
              var jsonContent = JSON.parse(contents);
              var newgem2 = parseInt(jsonContent.gems)
              var gemargs = parseInt(gems)
              newgem2 += gemargs
              const gemss =  parseInt(newgem2)
      
              playername2.gems = gemss;
      
              fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
                  return client.reply(from, `Gems has been Gived!\n\Player Name: ${args[0]}\nGems Amount: ${args[1]}\nTotal Gems: ${playername2.gems}`, id)
                })
              })
            }
            if (command == "changepass") {
                if (isGroupMsg) {
                    return client.reply(from, "use this command on pribadi chat!", id)
                }
                if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
                const user = args[0]
                const pass = args[1]
                if(!user) return client.reply(from, `Usage: ${config.prefix}changepass <playername> <new password>`, id);

                if(!pass) return client.reply(from, `Usage: ${config.prefix}changepass <playername> <new password>`, id);

                if (!fs.existsSync(config.player)) {
                    return client.reply(from, "Player Folder not found!", id)
                }
                if (!fs.existsSync(config.player + "/" + user + ".json")) {
                return  client.reply(from, "Player Not Found!", id)
                }
                let playername1 = `./${config.player}/${args[0]}.json`
                let playername2 = require(playername1);
                bcrypt.genSalt(12, function(err, salt) {
                    bcrypt.hash(pass, salt, function(err, hash) {
                    playername2.password = hash;
                    fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
                    if (err)
                        return console.log(err);
                    client.reply(from, `Changed password! of player named: ${args[0]}\nNew Pass: ${pass}`, id);
                    })
                    })
                })
            }
            if (command == "count") {
                if (!isGroupMsg) return;
                if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
                fs.readdir(config.player, (err, files) => {
                    if (err)
                    {
                      client.reply(from, "Player Folder Not Found", id)
                    }
                    fs.readdir(config.world, (err1, files1) => {
                      if (err1)
                    {
                      client.reply(from, "World Folder Not Found!", id)
                    }
                    const f1 = files.length;
                    const f2 = files1.length;
                    const sf1 = getTotalSize(config.player)
                    const sf2 = getTotalSize(config.world)
                  return client.reply(from, "Player Count = " + f1 + "\nPlayer Folder Size = " + sf1 + "\nWorlds Count = " + f2 + "\nWorlds Folder Size = " + sf2, id);
                  })
                })
            }

          
            if (command == "delplayer") {
              if (!isGroupMsg) return;
              if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
              const fileplayer = config.player;
                fs.readdir(fileplayer, (err, files1) => {
                  if (err)
                  {
                    return client.reply(from, "player folder not found!", id);
                  }
                  for (const file1 of files1) {
                    fs.unlink(path.join(fileplayer, file1), err => {
                      if (err)
                      {
                        return client.reply(from, "player folder not found!", id);
                      }
                    })
                  }
                })
              client.reply(from, 'Player & World has been Deleted! Restarting...', id);
                kill(`taskkill /f /im ${config.exegtps}`)
                fs.access(config.exegtps, (err) => {
                  if (err) return client.reply(from, config.exegtps + " Not Found!", id)
                  exec(`start ${config.exegtps}`)
                })
              client.reply(from, "Server has been Restarted!", id)
            }
            if (command == "delworld")   {
              if (!isGroupMsg) return;
              if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
              const fileworld = config.world;
                fs.readdir(fileworld, (err, files1) => {
                  if (err)
                  {
                    return client.reply(from, "world folder not found!", id);
                  }
                  for (const file1 of files1) {
                    fs.unlink(path.join(fileworld, file1), err => {
                      if (err)
                      {
                        return client.reply(from, "world folder not found!", id);
                      }
                    })
                  }
                })
              client.reply(from, 'Player has been Deleted! Restarting...', id);
                kill(`taskkill /f /im ${config.exegtps}`)
                fs.access(config.exegtps, (err) => {
                  if (err) return client.reply(from, config.exegtps + " Not Found!", id)
                  exec(`start ${config.exegtps}`)
                })
              client.reply(from, "Server has been Restarted!", id)
            }
            
            if (command == "rollbackall") {
              if (!isGroupMsg) return;
              if (!isOwner) return client.reply(from, "*Kamu Bukan Owner Server*", id)
              const fileworld = config.world;
              const fileplayer = config.player;
                fs.readdir(fileworld, (err, files1) => {
                  if (err)
                  {
                    return client.reply(from, "world folder not found!", id);
                  }
                  for (const file1 of files1) {
                    fs.unlink(path.join(fileworld, file1), err => {
                      if (err)
                      {
                        return client.reply(from, "world folder not found!", id);
                      }
                    })
                  }
                })
                fs.readdir(fileplayer, (err, files2) => {
                  if (err)
                  {
                    return client.reply(from, "player folder not found!", id);
                  }
                  for (const file2 of files2) {
                    fs.unlink(path.join(fileplayer, file2), err => {
                      if (err)
                      {
                        return client.reply(from, "player folder not found!", id);
                      }
                    })
                  }
                })
              client.reply(from, 'Player has been Deleted! Restarting...', id);
                kill(`taskkill /f /im ${config.exegtps}`)
                fs.access(config.exegtps, (err) => {
                  if (err) return client.reply(from, config.exegtps + " Not Found!", id)
                  exec(`start ${config.exegtps}`)
                })
              client.reply(from, "Server has been Restarted!", id)
            }
          })
} catch (err) {
  console.log(err)
}
}

create(data(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))
