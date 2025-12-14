module SimulatedEffect exposing (..)

import Effect exposing (Effect(..))
import Json.Encode as Enc
import Main
import Model exposing (Model, Msg(..))
import Model.PostIds exposing (itemName)
import ProgramTest
import SimulatedEffect.Cmd
import SimulatedEffect.Http as Http
import SimulatedEffect.Task as Task
import SimulatedEffect.Time as Time
import TestData as Data
import TestUtils as Utils
import Url.Builder as UrlBuilder


start : ProgramTest.ProgramTest Model Msg Effect
start =
    ProgramTest.createElement
        { init = Main.init Main.devFlags
        , update = Main.update
        , view = Main.view
        }
        |> ProgramTest.withSimulatedEffects simulateEffect
        |> ProgramTest.start ()


fromLoadedState : ProgramTest.ProgramTest Model Msg Effect
fromLoadedState =
    let
        posts =
            Data.posts |> List.take 10

        postIds =
            posts |> List.map .id |> Utils.intListToJsonList

        afterFirstRequest =
            start
                |> Utils.ensureHttpGetRequestWithResponse (Main.devFlags.apiUrl ++ "/v0/topstories.json") postIds
    in
    List.foldl (\post state -> Utils.ensureHttpGetRequestWithResponse (Main.devFlags.apiUrl ++ "/v0/item/" ++ String.fromInt post.id ++ ".json") (Data.encodePost post) state) afterFirstRequest posts


simulateEffect : Effect -> ProgramTest.SimulatedEffect Model.Msg
simulateEffect effect =
    case effect of
        NoEffect ->
            SimulatedEffect.Cmd.none

        GetTime ->
            Task.perform GotTime Time.now

        GetItems { apiUrl, item, onResult, decoder } ->
            Http.get
                { url = UrlBuilder.crossOrigin apiUrl [ "v0", itemName item ++ "stories.json" ] []
                , expect = Http.expectJson onResult decoder
                }

        GetPost { apiUrl, postId, onResult, decoder } ->
            let
                id =
                    String.fromInt postId ++ ".json"
            in
            Http.get
                { url = UrlBuilder.crossOrigin apiUrl [ "v0", "item", id ] []
                , expect = Http.expectJson onResult decoder
                }
