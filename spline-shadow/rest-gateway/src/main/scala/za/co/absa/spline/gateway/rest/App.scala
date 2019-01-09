package za.co.absa.spline.gateway.rest

import javax.servlet.ServletContext
import org.springframework.web.WebApplicationInitializer
import org.springframework.web.context.ContextLoaderListener
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.DispatcherServlet

object App extends WebApplicationInitializer {
  override def onStartup(container: ServletContext): Unit = {
    container.addListener(new ContextLoaderListener(new AnnotationConfigWebApplicationContext {
      register(classOf[AppConfig])
    }))

    val dispatcher = container.addServlet("dispatcher", new DispatcherServlet(new AnnotationConfigWebApplicationContext {
      register(classOf[RESTConfig])
    }))

    dispatcher.setLoadOnStartup(1)
    dispatcher.addMapping("/*")
    dispatcher.setAsyncSupported(true)
  }
}
