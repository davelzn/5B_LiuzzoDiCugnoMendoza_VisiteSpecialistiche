import { cacheToken, myKey } from "./.gitignore/conf.json"



export function carica() {
    return fetch('https://ws.progettimolinari.it/cache/get', {
            headers: {
                'Content-Type': 'application/json',
                key: cacheToken,
            },
            method: 'POST',
            body: JSON.stringify({
                key: myKey,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log('Dati caricati:', r.result);
            diz = r.result || {};
            render();
        })
        .catch((err) => console.log('Errore durante il caricamento:', err));
}

export function salva() {
    return fetch('https://ws.progettimolinari.it/cache/set', {
            headers: {
                'Content-Type': 'application/json',
                key: myToken,
            },
            method: 'POST',
            body: JSON.stringify({
                key: myKey,
                value: diz,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log('Dati salvati:', r);
            return r;
        })
        .catch((err) => console.log('Errore durante il salvataggio:', err));
}