package main

// net/http for web requests

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

func grabData() string {

	response, err := http.Get("http://pokeapi.co/api/v2/pokedex/kanto/")

	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	body, err := ioutil.ReadAll(response.Body)

	if err != nil {
		log.Fatal(nil)
	}

	return string(body)

}

func sayHello(w http.ResponseWriter, r *http.Request) {
	message := r.URL.Path
	message = strings.TrimPrefix(message, "/")
	message = "Hello " + message
}

func grabPokemonData() string {

	response, err := http.Get("http://pokeapi.co/api/v2/pokemon/bulbasaur")

	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	body, err := ioutil.ReadAll(response.Body)

	if err != nil {
		log.Fatal(nil)
	}

	return string(body)

}

func main() {

	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		fmt.Fprint(res, grabData())
	})

	log.Fatal(http.ListenAndServe(":8002", nil))
	grabData()

	http.HandleFunc("/pokemon", func(res http.ResponseWriter, req *http.Request) {
		fmt.Fprint(res, grabPokemonData())
	})
	grabPokemonData()

	/*
		responseData, err := ioutil.ReadAll(response.Body)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(string(responseData))

		content, err := ioutil.ReadFile("test.txt")

		if err != nil {
			fmt.Println("File reading error", err)
			return
		}
		fmt.Println("Contents of file:", string(content))

		resp, err := http.Get("https://api.github.com/users/simonshm5")
		if err != nil {
			print(err)
		}
		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			print(err)
		}
		fmt.Print(string(body))

	*/

}
