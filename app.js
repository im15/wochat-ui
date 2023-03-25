const __question = `How many cost this?`
const __answer = `
<p>How many cost this?</p>
                    <p>How many cost this? How many cost this? How many cost this? How many cost this? How many cost this?</p>
                    <pre><code><span class="kw">package</span> <span class="vn">main</span>

<span class="kw">import</span> <span class="str">"fmt"</span>

<span class="kw">func</span> <span class="vn">main</span><span class="cd">()</span> <span class="cd">{</span>
    <span class="cm">// this is comment</span>
    <span class="kw">const</span> <span class="vn">world</span> = <span class="str">"World"</span>
    <span class="pn">fmt</span>.<span class="mn">Printf</span>(<span class="str">"Hello %s!"</span>, <span class="vn">world</span>)
<span class="cd">}</span></code></pre>
</article>
<p>How many cost this? How many cost this? How many cost this? How many cost this? How many cost this? How many cost this? How many cost this? How many cost this? How many cost this?</p>
<p>How many cost this? How many cost this? How many cost this? How many cost this? How many cost this?</p>
<p>How many cost this? How many cost this? How many cost this? How many cost this? How many cost this? How many cost this? How many cost this?</p>
`

!function () {
    const app = window.__chatApp = {}, ui = app.ui = {},
        doc = document, body = doc.body,
        createElement = function (e) { return doc.createElement(e) },
        toggleClass = function (e, n) { return e.classList.toggle(n) },
        hasClass = function (e, n) { return e.classList.contains(n) }
    //
    function sectionChatCompletion() {
        let toggle
        const section = createElement('section')
        return [function () {
            const div = createElement('div')
            return div.className = "layout-flex question", [
                function () {
                    const div = createElement('div')
                    return (div.className = "avatar", div.innerHTML = `<img src="../avatar00.png" width="30" alt="">`, div)
                }, function () {
                    const div = createElement('div')
                    return (div.innerHTML = `${__question}`, div)
                }, function () {
                    const div = createElement('div');
                    div.onclick = function () {
                        toggleClass(toggle, 'hide')
                        const icon = this.querySelector('i')
                        //<i class="fa-solid fa-circle-chevron-down"></i>
                        icon.className = hasClass(toggle, "hide") ? "fa-solid fa-circle-chevron-down" : "fa-solid fa-circle-chevron-left"
                    }
                    return (div.innerHTML = `<span><i class="fa-solid fa-circle-chevron-left"></i></span>`, div)
                }
            ].forEach(e => div.appendChild(e())), div
        }, function () {
            const div = createElement('div')
            return toggle = div, div.className = "layout-flex answer", [
                function () {
                    const div = createElement('div')
                    return div.className = "avatar", div.innerHTML = `<img src="../icon.png" width="30" alt="">`, div
                }, function () {
                    const div = createElement('div')
                    return div.innerHTML = `<article>${__answer}</article>`, div
                }
            ].forEach(e => div.appendChild(e())), div
        }].forEach(e => section.appendChild(e())), section
    }
    //
    ui.init = function () {
        [function () {
            const header = createElement('header')
            return (header.innerHTML = 'ChatGPT <span class="version">v1.0.1</span>', header)
        }, function () {
            const main = ui.main = createElement('main')
            return main.className = 'app', main
        }, function () {
            const footer = createElement('footer')
            return footer.appendChild(function () {
                const section = createElement('section')
                return section.appendChild(function () {
                    const div = createElement('div')
                    return div.className = "layout-flex", [
                        function () {
                            const div = createElement('div')
                            return div.className = "avatar",
                                div.innerHTML = `<img src="../avatar00.png" width="30" alt="">`,
                                div
                        }, function () {
                            const div = createElement('div'),
                                input = createElement('input')

                            return input.type = "text",

                                div.appendChild(input),
                                div
                        }, function () {
                            const div = createElement('div')
                            div.innerHTML = `<button type="submit"><i class="fa-solid fa-paper-plane"></i></button>`
                            return div
                        }
                    ].forEach(e => div.appendChild(e())), div
                }()), section
            }()), footer
        }].forEach(block => body.appendChild(block()))
    }
    //
    ui.addChatBlock = function () {
        this.main.appendChild(sectionChatCompletion())
    }
    // const main = document.createElement('main')

    // const article = document.createElement('article')
    // article.className = ''
    // app.article = article
    // let box = document.createElement('div')
    // let buf = document.createElement('pre')
    // box.appendChild(buf)
    // body.appendChild(box)

    // const input = document.createElement('div')
    // input.innerHTML = ``
    // main.appendChild(input)

    // main.appendChild(article)
    // body.appendChild(main)
    app.launch = function () {
        this.ui.init()
        for (let i = 0; i < 10; i++)this.ui.addChatBlock()
        this.destory()
    }
}();
!function () { __chatApp.destory = function () { return (delete window.__chatApp, document.querySelectorAll('script').forEach(e => e.remove())) } }();
!function () {
    return
    const app = window.__chatApp
    function createChatStreamCompletion() {
        const eventSource = new EventSource("http://localhost:8080/v1/chat/completions", {
            // withCredentials: true
        })
        let messageContext = ''
        eventSource.addEventListener('open', (event) => {
            console.log(event)
            messageContext = ''
        })

        eventSource.addEventListener('message', (event) => {
            const data = event.data;
            if (data === 'DONE') { eventSource.close(); return }
            console.log(data)
            try {
                const chunk = JSON.parse(data)
                const choice = chunk.choices[0]
                if (choice.finish_reason === 'stop') {

                } else {
                    if (choice.delta.role) {

                    } else {
                        messageContext += choice.delta.content//.replaceAll('\n','<br>')
                        app.article.innerHTML = marked.parse(messageContext)
                    }
                }
            } catch (error) {

            }
        })

        eventSource.addEventListener('error', (event) => {
            console.log(event)
            eventSource.close()
        })
    }

    // createChatStreamCompletion()
}();
!function () { return __chatApp.launch() }();