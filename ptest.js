// to load this script into a dev console paste the line under this without comments
// fetch("https://raw.githubusercontent.com/DrakeAxelrod/dev-console-ptest-script/main/ptest.js").then(res => res.text()).then(res => eval(res)) 

((window) => {
  window.ptest = {}

  window.ptest.save = (data, filename) => {
    if (!data) {
      console.error("Console.save: No data")
      return
    }

    if (!filename) filename = `${window.location.href}.json`

    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4)
    }

    let blob = new Blob([data], { type: "text/json" }),
      e = document.createEvent("MouseEvents"),
      a = document.createElement("a")

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":")
    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }

  window.ptest.vars = () => {
    const results = {}
    const standardGlobals = new Set([
      "window",
      "self",
      "document",
      "name",
      "location",
      "customElements",
      "history",
      "locationbar",
      "menubar",
      "personalbar",
      "scrollbars",
      "statusbar",
      "toolbar",
      "status",
      "closed",
      "frames",
      "length",
      "top",
      "opener",
      "parent",
      "frameElement",
      "navigator",
      "origin",
      "external",
      "screen",
      "innerWidth",
      "innerHeight",
      "scrollX",
      "pageXOffset",
      "scrollY",
      "pageYOffset",
      "visualViewport",
      "screenX",
      "screenY",
      "outerWidth",
      "outerHeight",
      "devicePixelRatio",
      "clientInformation",
      "screenLeft",
      "screenTop",
      "defaultStatus",
      "defaultstatus",
      "styleMedia",
      "onsearch",
      "isSecureContext",
      "performance",
      "onappinstalled",
      "onbeforeinstallprompt",
      "crypto",
      "indexedDB",
      "webkitStorageInfo",
      "sessionStorage",
      "localStorage",
      "onabort",
      "onblur",
      "oncancel",
      "oncanplay",
      "oncanplaythrough",
      "onchange",
      "onclick",
      "onclose",
      "oncontextmenu",
      "oncuechange",
      "ondblclick",
      "ondrag",
      "ondragend",
      "ondragenter",
      "ondragleave",
      "ondragover",
      "ondragstart",
      "ondrop",
      "ondurationchange",
      "onemptied",
      "onended",
      "onerror",
      "onfocus",
      "onformdata",
      "oninput",
      "oninvalid",
      "onkeydown",
      "onkeypress",
      "onkeyup",
      "onload",
      "onloadeddata",
      "onloadedmetadata",
      "onloadstart",
      "onmousedown",
      "onmouseenter",
      "onmouseleave",
      "onmousemove",
      "onmouseout",
      "onmouseover",
      "onmouseup",
      "onmousewheel",
      "onpause",
      "onplay",
      "onplaying",
      "onprogress",
      "onratechange",
      "onreset",
      "onresize",
      "onscroll",
      "onseeked",
      "onseeking",
      "onselect",
      "onstalled",
      "onsubmit",
      "onsuspend",
      "ontimeupdate",
      "ontoggle",
      "onvolumechange",
      "onwaiting",
      "onwebkitanimationend",
      "onwebkitanimationiteration",
      "onwebkitanimationstart",
      "onwebkittransitionend",
      "onwheel",
      "onauxclick",
      "ongotpointercapture",
      "onlostpointercapture",
      "onpointerdown",
      "onpointermove",
      "onpointerup",
      "onpointercancel",
      "onpointerover",
      "onpointerout",
      "onpointerenter",
      "onpointerleave",
      "onselectstart",
      "onselectionchange",
      "onanimationend",
      "onanimationiteration",
      "onanimationstart",
      "ontransitionrun",
      "ontransitionstart",
      "ontransitionend",
      "ontransitioncancel",
      "onafterprint",
      "onbeforeprint",
      "onbeforeunload",
      "onhashchange",
      "onlanguagechange",
      "onmessage",
      "onmessageerror",
      "onoffline",
      "ononline",
      "onpagehide",
      "onpageshow",
      "onpopstate",
      "onrejectionhandled",
      "onstorage",
      "onunhandledrejection",
      "onunload",
      "alert",
      "atob",
      "blur",
      "btoa",
      "cancelAnimationFrame",
      "cancelIdleCallback",
      "captureEvents",
      "clearInterval",
      "clearTimeout",
      "close",
      "confirm",
      "createImageBitmap",
      "fetch",
      "find",
      "focus",
      "getComputedStyle",
      "getSelection",
      "matchMedia",
      "moveBy",
      "moveTo",
      "open",
      "postMessage",
      "print",
      "prompt",
      "queueMicrotask",
      "releaseEvents",
      "requestAnimationFrame",
      "requestIdleCallback",
      "resizeBy",
      "resizeTo",
      "scroll",
      "scrollBy",
      "scrollTo",
      "setInterval",
      "setTimeout",
      "stop",
      "webkitCancelAnimationFrame",
      "webkitRequestAnimationFrame",
      "chrome",
      "caches",
      "ondevicemotion",
      "ondeviceorientation",
      "ondeviceorientationabsolute",
      "originAgentCluster",
      "cookieStore",
      "showDirectoryPicker",
      "showOpenFilePicker",
      "showSaveFilePicker",
      "speechSynthesis",
      "onpointerrawupdate",
      "trustedTypes",
      "crossOriginIsolated",
      "openDatabase",
      "webkitRequestFileSystem",
      "webkitResolveLocalFileSystemURL",
    ])

    for (const key of Object.keys(window)) {
      if (!standardGlobals.has(key)) {
        results[key] = {
          typeof: typeof window[key],
          object: window[key],
          toString: window[key] ? window[key].toString() : "",
        }
      }
    }
    return results
  }

  window.ptest.formcontrols = () => {
    var forms = document.querySelectorAll("form")

    for (var i = 0, len = forms.length; i < len; i++) {
      var tab = []

      console.group("HTMLForm quot;" + forms[i].name + "quot;: " + forms[i].action)
      console.log(
        "Element:",
        forms[i],
        "\nName:    " + forms[i].name + "\nMethod:  " + forms[i].method.toUpperCase() + "\nAction:  " + forms[i].action ||
          "null",
      )

      ;["input", "textarea", "select"].forEach(function (control) {
        ;[].forEach.call(forms[i].querySelectorAll(control), function (node) {
          tab.push({
            Element: node,
            Type: node.type,
            Name: node.name,
            Value: node.value,
            "Pretty Value": isNaN(node.value) || node.value === "" ? node.value : parseFloat(node.value),
          })
        })
      })

      console.table(tab)
      console.groupEnd()
    }
  }

  window.ptest.logglobals = () => {
    "use strict"

    function getIframe() {
      var el = document.createElement("iframe")
      el.style.display = "none"
      document.body.appendChild(el)
      var win = el.contentWindow
      document.body.removeChild(el)
      return win
    }

    function detectGlobals() {
      var iframe = getIframe()
      var ret = Object.create(null)

      for (var prop in window) {
        if (!(prop in iframe)) {
          ret[prop] = window[prop]
        }
      }

      return ret
    }

    console.log(detectGlobals())
  }

  window.ptest.cookies = () => {
    "use strict"

    if (document.cookie) {
      const cookies = document.cookie.split(/; ?/).map((s) => {
        const [, key, value] = s.match(/^(.*?)=(.*)$/)
        return {
          key,
          value: decodeURIComponent(value),
        }
      })

      console.table(cookies)
    } else {
      console.warn("document.cookie is empty!")
    }
  }

})(window)
