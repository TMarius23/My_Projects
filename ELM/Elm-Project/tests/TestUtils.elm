module TestUtils exposing (..)

import Expect
import Json.Encode as Enc
import ProgramTest
import Test.Runner


toJsonList : (a -> Enc.Value) -> List a -> String
toJsonList enc l =
    Enc.encode 2 (Enc.list enc l)


intListToJsonList : List Int -> String
intListToJsonList l =
    toJsonList Enc.int l


ensureHttpGetRequest : String -> ProgramTest.ProgramTest model msg effect -> ProgramTest.ProgramTest model msg effect
ensureHttpGetRequest url =
    ProgramTest.ensureHttpRequest "GET" url (\request -> request.body |> Expect.equal "")


expectHttpGetRequest : String -> ProgramTest.ProgramTest model msg effect -> Expect.Expectation
expectHttpGetRequest url =
    ProgramTest.expectHttpRequest "GET" url (\request -> request.body |> Expect.equal "")


ensureHttpGetRequestWithResponse : String -> String -> ProgramTest.ProgramTest model msg effect -> ProgramTest.ProgramTest model msg effect
ensureHttpGetRequestWithResponse url response =
    ensureHttpGetRequest url >> ProgramTest.simulateHttpOk "GET" url response


{-| Passes if an expectation holds for each element in a list
-}
expectEach : (a -> Expect.Expectation) -> List a -> Expect.Expectation
expectEach expectation l =
    Expect.all
        (List.range 0 (List.length l - 1)
            |> List.map
                (\i list ->
                    List.drop i list
                        |> List.head
                        |> Maybe.map (\e -> expectation e)
                        |> Maybe.withDefault (Expect.fail "should not happen")
                )
        )
        l


{-| Passes if any of the given expectations holds for a value
-}
expectAny : List (a -> Expect.Expectation) -> a -> Expect.Expectation
expectAny expectations i =
    let
        errors =
            expectations |> List.map (\f -> f i) |> List.filterMap Test.Runner.getFailureReason
    in
    if List.length errors == List.length expectations then
        let
            descriptions =
                errors |> List.map .description
        in
        descriptions |> String.join "\n" |> Expect.fail

    else
        Expect.pass
