    async function getPokemon() {
        const query = document.getElementById('search').value.trim().toLowerCase();
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${query}`;
    
        try {
            console.log('Buscando Pokémon...');
            const response = await fetch(apiUrl);
    
            // Si la respuesta no es 200 (OK)
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
    
            const data = await response.json();
            console.log('Datos recibidos:', data);
    
            // Mostrar resultados
            mostrarResultados(data);
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alert('Pokémon no encontrado. Intenta de nuevo.');
        }
    }
    
    function mostrarResultados(pokemon) {
        const container = document.getElementById('pokemon-container');
        container.innerHTML = ''; // Limpiar resultados previos
    
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
    
        // Accede a las propiedades del Pokémon
        const imageUrl = pokemon.sprites.front_default;
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const types = pokemon.types.map(type => type.type.name).join(', ');
        const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
    
        // Crear elementos HTML
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = name;
    
        const nameElement = document.createElement('h2');
        nameElement.textContent = name;
    
        const typesElement = document.createElement('p');
        typesElement.textContent = `Tipos: ${types}`;
    
        const statsElement = document.createElement('p');
        statsElement.textContent = `Estadísticas: ${stats}`;
    
        // Añadir los elementos al div
        pokemonDiv.appendChild(imgElement);
        pokemonDiv.appendChild(nameElement);
        pokemonDiv.appendChild(typesElement);
        pokemonDiv.appendChild(statsElement);
    
        // Añadir al contenedor principal
        container.appendChild(pokemonDiv);
    }
    
    // Agregar el evento al botón de búsqueda
    document.getElementById('submit-btn').addEventListener('click', getPokemon);
