let access_token;
const clientId = "b071677f4a4747fd87cdf38b7a6f5faf";
const redirectUri = "http://jammming-portal.surge.sh";
export const Spotify = {
  getAccessToken() {
    if (access_token) {
      return access_token;
    }
    const aMatch = window.location.href.match(/access_token=([^&]*)/);
    const eMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (aMatch && eMatch) {
      access_token = aMatch[1];
      const exp_time = Number(eMatch[1]);
      window.setTimeout(() => (access_token = ""), exp_time * 1000);
      window.history.pushState("Access Token", null, "/");
      return access_token;
    } else {
      const url = `https://accounts.spotify.com/authorize?client_id=b071677f4a4747fd87cdf38b7a6f5faf&response_type=token&scope=playlist-modify-public&redirect_uri=http://jammming-portal.surge.sh`;
      window.location = url;
    }
  },
  search(searchTerm) {
    const access_token = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}&limit=7`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          image: track.album.images[1].url,
        }));
      });
  },
  savePlaylist(name_pl, track_uri) {
    if (!name_pl || !track_uri) {
      return;
    } else {
      const access_token = Spotify.getAccessToken();
      const header = {
        Authorization: `Bearer ${access_token}`,
      };
      let user_id;
      return fetch("https://api.spotify.com/v1/me", {
        headers: header,
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          user_id = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            headers: header,
            method: "POST",
            body: JSON.stringify({ name: name_pl }),
          })
            .then((response) => {
              return response.json();
            })
            .then((jsonResponse) => {
              const playlistId = jsonResponse.id;
              return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}/tracks`, {
                headers: header,
                method: "POST",
                body: JSON.stringify({ uris: track_uri }),
              });
            });
        });
    }
  },
};
