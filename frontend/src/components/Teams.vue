<template>
    <div class="teams">
        <h1>Teams</h1>
        This file will list all the teams.

        <div v-for="team in teams" :key="team.id">
            <p>
            <span><b>{{ team.code }}</b></span><br />
            <span>{{ team.name }}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import TeamsService from "@/services/TeamsService";
    export default {
        name: "teams",
        data() {
            return {
            teams: []
            };
        },
        mounted() {
            this.findAllTeams();
        },
        methods: {
            async findAllTeams() {
            const response = await TeamsService.findAllTeams();
            this.teams = response.data;
            }
        }
    };
</script>
